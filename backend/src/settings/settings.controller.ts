import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

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
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    findAll() {
        return this.settingsService.getAll();
    }

    @Get(':key')
    findOne(@Param('key') key: string) {
        return this.settingsService.get(key);
    }

    @Post()
    set(@Body() dto: SetSettingDto) {
        return this.settingsService.set(dto.key, dto.value);
    }

    @Delete(':key')
    remove(@Param('key') key: string) {
        return this.settingsService.delete(key);
    }
}
