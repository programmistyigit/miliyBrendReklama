import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('works')
export class WorksController {
    constructor(private readonly worksService: WorksService) { }

    // Public endpoints
    @Get()
    findActive() {
        return this.worksService.findActive();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.worksService.findOne(id);
    }

    // Admin endpoints
    @Get('admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    findAll() {
        return this.worksService.findAll();
    }

    @Get('admin/stats')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    getStats() {
        return this.worksService.getStats();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createWorkDto: CreateWorkDto) {
        return this.worksService.create(createWorkDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
        return this.worksService.update(id, updateWorkDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.worksService.remove(id);
    }
}
