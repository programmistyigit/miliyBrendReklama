import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }]),
        forwardRef(() => TelegramModule),
    ],
    controllers: [SettingsController],
    providers: [SettingsService],
    exports: [SettingsService],
})
export class SettingsModule { }

