import { Module, Global } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { SettingsModule } from '../settings/settings.module';

@Global()
@Module({
    imports: [SettingsModule],
    controllers: [TelegramController],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule { }
