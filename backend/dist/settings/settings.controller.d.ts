import { SettingsService } from './settings.service';
import { TelegramService } from '../telegram/telegram.service';
declare class SetSettingDto {
    key: string;
    value: any;
}
export declare class SettingsController {
    private readonly settingsService;
    private readonly telegramService;
    constructor(settingsService: SettingsService, telegramService: TelegramService);
    findAll(): Promise<import("./schemas/settings.schema").SettingsDocument[]>;
    findOne(key: string): Promise<any>;
    set(dto: SetSettingDto): Promise<import("./schemas/settings.schema").SettingsDocument>;
    remove(key: string): Promise<void>;
}
export {};
