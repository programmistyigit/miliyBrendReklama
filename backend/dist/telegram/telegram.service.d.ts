import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from '../settings/settings.service';
import { ContactDocument } from '../contacts/schemas/contact.schema';
import { OrderDocument } from '../orders/schemas/order.schema';
export declare class TelegramService implements OnModuleInit {
    private configService;
    private settingsService;
    private readonly logger;
    private bot;
    private adminChatId;
    private webAppUrl;
    constructor(configService: ConfigService, settingsService: SettingsService);
    onModuleInit(): Promise<void>;
    initBot(): Promise<void>;
    private setBotProfilePicture;
    private setMenuButton;
    restartBot(): Promise<void>;
    sendContactNotification(contact: ContactDocument): Promise<void>;
    sendOrderNotification(order: OrderDocument): Promise<void>;
    private escapeMarkdown;
    getAdminChatId(): string;
}
