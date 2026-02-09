import { Model } from 'mongoose';
import { SettingsDocument } from './schemas/settings.schema';
export declare class SettingsService {
    private settingsModel;
    constructor(settingsModel: Model<SettingsDocument>);
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<SettingsDocument>;
    getAll(): Promise<SettingsDocument[]>;
    delete(key: string): Promise<void>;
}
