import { SettingsService } from './settings.service';
declare class SetSettingDto {
    key: string;
    value: any;
}
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("./schemas/settings.schema").SettingsDocument[]>;
    findOne(key: string): Promise<any>;
    set(dto: SetSettingDto): Promise<import("./schemas/settings.schema").SettingsDocument>;
    remove(key: string): Promise<void>;
}
export {};
