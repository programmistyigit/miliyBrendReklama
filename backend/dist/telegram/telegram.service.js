"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const settings_service_1 = require("../settings/settings.service");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(configService, settingsService) {
        this.configService = configService;
        this.settingsService = settingsService;
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.bot = null;
        this.adminChatId = '';
        this.webAppUrl = '';
        this.webAppUrl = this.configService.get('WEBAPP_URL') || 'https://milliybrendagency.uz';
    }
    async onModuleInit() {
        await this.initBot();
    }
    async initBot() {
        if (this.bot) {
            try {
                await this.bot.stopPolling();
            }
            catch (e) {
            }
            this.bot = null;
        }
        const token = await this.settingsService.get('telegram_token');
        const adminId = await this.settingsService.get('telegram_admin_id');
        if (!token) {
            this.logger.warn('Telegram bot token not configured in settings. Bot will not start.');
            return;
        }
        this.adminChatId = adminId || '';
        try {
            this.bot = new TelegramBot(token, { polling: true });
            this.bot.onText(/\/start/, async (msg) => {
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
            await this.setBotProfilePicture();
            await this.setMenuButton();
            this.logger.log('✅ Telegram bot initialized with polling');
        }
        catch (error) {
            this.logger.error('Failed to initialize Telegram bot:', error);
        }
    }
    async setBotProfilePicture() {
        try {
            const frontendLogoPath = path.resolve(__dirname, '../../../frontend/public/logo.png');
            const uploadsDir = this.configService.get('UPLOAD_PATH') || './uploads';
            const uploadsLogoPath = path.join(uploadsDir, 'logo.png');
            let imagePath = '';
            if (fs.existsSync(frontendLogoPath)) {
                fs.copyFileSync(frontendLogoPath, uploadsLogoPath);
                imagePath = uploadsLogoPath;
                this.logger.log('Using logo.png from frontend/public');
            }
            else if (fs.existsSync(uploadsLogoPath)) {
                imagePath = uploadsLogoPath;
                this.logger.log('Using logo.png from uploads folder');
            }
            else {
                const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
                if (files.length > 0) {
                    imagePath = path.join(uploadsDir, files[0]);
                }
                else {
                    this.logger.warn('No profile picture found for the bot');
                    return;
                }
            }
            const photo = fs.createReadStream(imagePath);
            await this.bot.setMyPhoto(photo);
            this.logger.log('✅ Bot profile picture set successfully');
        }
        catch (error) {
            this.logger.warn('Could not set bot profile picture:', error?.message || error);
        }
    }
    async setMenuButton() {
        try {
            await this.bot.setChatMenuButton({
                menu_button: {
                    type: 'web_app',
                    text: '🌐 Open App',
                    web_app: { url: this.webAppUrl },
                },
            });
            this.logger.log('✅ Bot menu button set successfully');
        }
        catch (error) {
            this.logger.warn('Could not set menu button:', error?.message || error);
        }
    }
    async restartBot() {
        this.logger.log('Restarting Telegram bot with new settings...');
        await this.initBot();
    }
    async sendContactNotification(contact) {
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
        }
        catch (error) {
            this.logger.error('Failed to send contact notification:', error);
        }
    }
    async sendOrderNotification(order) {
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
        }
        catch (error) {
            this.logger.error('Failed to send order notification:', error);
        }
    }
    escapeMarkdown(text) {
        return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
    }
    getAdminChatId() {
        return this.adminChatId;
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        settings_service_1.SettingsService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map