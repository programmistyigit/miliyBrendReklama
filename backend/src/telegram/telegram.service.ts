import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from '../settings/settings.service';
import { ContactDocument } from '../contacts/schemas/contact.schema';
import { OrderDocument } from '../orders/schemas/order.schema';
import * as TelegramBot from 'node-telegram-bot-api';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TelegramService implements OnModuleInit {
    private readonly logger = new Logger(TelegramService.name);
    private bot: any = null;
    private adminChatId: string = '';
    private webAppUrl: string = 'https://c921-213-230-93-42.ngrok-free.app/'

    constructor(
        private configService: ConfigService,
        private settingsService: SettingsService,
    ) {
        this.webAppUrl = "https://c921-213-230-93-42.ngrok-free.app";
    }

    async onModuleInit() {
        await this.initBot();
    }

    async initBot() {
        // Stop existing bot if running
        if (this.bot) {
            try {
                await this.bot.stopPolling();
            } catch (e) {
                // Ignore errors on stop
            }
            this.bot = null;
        }

        // Fetch settings from database
        const token = await this.settingsService.get('telegram_token');
        const adminId = await this.settingsService.get('telegram_admin_id');

        if (!token) {
            this.logger.warn('Telegram bot token not configured in settings. Bot will not start.');
            return;
        }

        this.adminChatId = adminId || '';

        try {
            this.bot = new TelegramBot(token, { polling: true });

            // Setup /start command handler
            this.bot.onText(/\/start/, async (msg: any) => {
                const chatId = msg.chat.id;
                const firstName = msg.from?.first_name || 'Foydalanuvchi';

                const greeting = `✨ *Assalomu alaykum, ${firstName}!*

🎯 *Milliy Brend Reklama Agentligi*ga xush kelibsiz!

Biz sizning brendingizni yangi bosqichga olib chiqamiz:
• 🎨 Kreativ dizayn yechimlari
• 📱 Zamonaviy raqamli marketing
• 🏆 Yuqori sifatli reklama xizmatlari

Quyidagi tugmani bosib, xizmatlarimiz bilan tanishing! 👇`;

                const keyboard = {
                    inline_keyboard: [
                        [
                            {
                                text: '🚀 Open App',
                                web_app: { url: this.webAppUrl },
                            },
                        ],
                    ],
                };

                await this.bot.sendMessage(chatId, greeting, {
                    parse_mode: 'Markdown',
                    reply_markup: keyboard,
                });
            });

            // Set bot profile picture from frontend logo
            await this.setBotProfilePicture();

            // Set menu button for WebApp
            await this.setMenuButton();

            this.logger.log('✅ Telegram bot initialized with polling');
        } catch (error) {
            this.logger.error('Failed to initialize Telegram bot:', error);
        }
    }

    private async setBotProfilePicture() {
        try {
            // Try to use logo.png from frontend first
            const frontendLogoPath = path.resolve(__dirname, '../../../frontend/public/logo.png');
            const uploadsDir = this.configService.get<string>('UPLOAD_PATH') || './uploads';
            const uploadsLogoPath = path.join(uploadsDir, 'logo.png');

            let imagePath = '';

            // Check frontend logo first
            if (fs.existsSync(frontendLogoPath)) {
                // Copy frontend logo to uploads folder
                fs.copyFileSync(frontendLogoPath, uploadsLogoPath);
                imagePath = uploadsLogoPath;
                this.logger.log('Using logo.png from frontend/public');
            } else if (fs.existsSync(uploadsLogoPath)) {
                imagePath = uploadsLogoPath;
                this.logger.log('Using logo.png from uploads folder');
            } else {
                // Fallback to any image in uploads
                const files = fs.readdirSync(uploadsDir).filter(f =>
                    f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg')
                );
                if (files.length > 0) {
                    imagePath = path.join(uploadsDir, files[0]);
                } else {
                    this.logger.warn('No profile picture found for the bot');
                    return;
                }
            }

            const photo = fs.createReadStream(imagePath);
            await this.bot.setMyPhoto(photo);
            this.logger.log('✅ Bot profile picture set successfully');
        } catch (error: any) {
            // setMyPhoto may not exist in older versions, or may fail
            this.logger.warn('Could not set bot profile picture:', error?.message || error);
        }
    }

    private async setMenuButton() {
        try {
            await this.bot.setChatMenuButton({
                menu_button: {
                    type: 'web_app',
                    text: '🌐 Open App',
                    web_app: { url: this.webAppUrl },
                },
            });
            this.logger.log('✅ Bot menu button set successfully');
        } catch (error: any) {
            this.logger.warn('Could not set menu button:', error?.message || error);
        }
    }

    async restartBot() {
        this.logger.log('Restarting Telegram bot with new settings...');
        await this.initBot();
    }

    async sendContactNotification(contact: ContactDocument): Promise<void> {
        if (!this.bot || !this.adminChatId) {
            this.logger.warn('Telegram not configured, skipping contact notification');
            return;
        }

        const message = `
📬 *Yangi aloqa so'rovi!*

👤 *Ism:* ${this.escapeMarkdown(contact.name)}
📞 *Telefon:* ${this.escapeMarkdown(contact.phone)}
💬 *Xabar:* ${this.escapeMarkdown(contact.message)}

📅 *Vaqt:* ${new Date().toLocaleString('uz-UZ')}
📍 *Sahifa:* Bog'lanish sahifasi
    `;

        try {
            await this.bot.sendMessage(this.adminChatId, message, { parse_mode: 'Markdown' });
            this.logger.log('Contact notification sent to Telegram');
        } catch (error) {
            this.logger.error('Failed to send contact notification:', error);
        }
    }

    async sendOrderNotification(order: OrderDocument): Promise<void> {
        if (!this.bot || !this.adminChatId) {
            this.logger.warn('Telegram not configured, skipping order notification');
            return;
        }

        const orderTypeText = order.type === 'service' ? '🛠 Xizmat buyurtmasi' : '🎨 O\'xshash ish buyurtmasi';
        const itemName = order.serviceName || order.workName || 'Noma\'lum';

        const message = `
📦 *Yangi buyurtma!*

${orderTypeText}

👤 *Ism:* ${this.escapeMarkdown(order.name)}
📞 *Telefon:* ${this.escapeMarkdown(order.phone)}
📋 *Xizmat/Ish:* ${this.escapeMarkdown(itemName)}

📅 *Vaqt:* ${new Date().toLocaleString('uz-UZ')}
📍 *Sahifa:* ${order.source || 'Noma\'lum'}
    `;

        try {
            await this.bot.sendMessage(this.adminChatId, message, { parse_mode: 'Markdown' });
            this.logger.log('Order notification sent to Telegram');
        } catch (error) {
            this.logger.error('Failed to send order notification:', error);
        }
    }

    private escapeMarkdown(text: string): string {
        return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
    }

    getAdminChatId(): string {
        return this.adminChatId;
    }
}
