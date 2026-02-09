import { TelegramService } from './telegram.service';
import { SettingsService } from '../settings/settings.service';
export declare class TelegramController {
    private readonly telegramService;
    private readonly settingsService;
    constructor(telegramService: TelegramService, settingsService: SettingsService);
    restartBot(): Promise<{
        success: boolean;
        message: string;
    }>;
    checkAdmin(req: any): Promise<{
        isAdmin: boolean;
    }>;
}
