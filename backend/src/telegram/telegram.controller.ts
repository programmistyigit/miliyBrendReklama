import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { SettingsService } from '../settings/settings.service';

@Controller('telegram')
export class TelegramController {
    constructor(
        private readonly telegramService: TelegramService,
        private readonly settingsService: SettingsService,
    ) { }

    @Post('restart')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async restartBot() {
        await this.telegramService.restartBot();
        return { success: true, message: 'Bot qayta ishga tushirildi' };
    }

    @Get('admin-check')
    async checkAdmin(@Req() req: any) {
        // This endpoint checks if a given telegram user id is the admin
        const telegramUserId = req.query.userId;
        if (!telegramUserId) {
            return { isAdmin: false };
        }
        const adminId = await this.settingsService.get('telegram_admin_id');
        return { isAdmin: telegramUserId === adminId };
    }
}
