import { Controller, Get, Post, Body, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import { TelegramService } from '../telegram/telegram.service';

class SetSettingDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsDefined()
    value: any;
}

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SettingsController {
    constructor(
        private readonly settingsService: SettingsService,
        @Inject(forwardRef(() => TelegramService))
        private readonly telegramService: TelegramService,
    ) { }

    @Get()
    findAll() {
        return this.settingsService.getAll();
    }

    @Get(':key')
    findOne(@Param('key') key: string) {
        return this.settingsService.get(key);
    }

    @Post()
    async set(@Body() dto: SetSettingDto) {
        const result = await this.settingsService.set(dto.key, dto.value);

        // If telegram settings are updated, restart the bot
        if (dto.key === 'telegram_token' || dto.key === 'telegram_admin_id') {
            await this.telegramService.restartBot();
        }

        return result;
    }

    @Delete(':key')
    remove(@Param('key') key: string) {
        return this.settingsService.delete(key);
    }
}
