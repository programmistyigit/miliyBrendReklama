import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
    ) { }

    async get(key: string): Promise<any> {
        const setting = await this.settingsModel.findOne({ key });
        return setting?.value;
    }

    async set(key: string, value: any): Promise<SettingsDocument> {
        const setting = await this.settingsModel.findOneAndUpdate(
            { key },
            { key, value },
            { upsert: true, new: true },
        );
        return setting;
    }

    async getAll(): Promise<SettingsDocument[]> {
        return this.settingsModel.find().exec();
    }

    async delete(key: string): Promise<void> {
        const result = await this.settingsModel.findOneAndDelete({ key });
        if (!result) {
            throw new NotFoundException('Setting not found');
        }
    }
}
