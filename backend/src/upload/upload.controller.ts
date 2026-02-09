import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UseGuards,
    Get,
    Param,
    Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { Response } from 'express';
import { existsSync } from 'fs';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

@Controller('upload')
export class UploadController {
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
            fileFilter: (req, file, callback) => {
                const ext = extname(file.originalname).toLowerCase();
                if (!allowedExtensions.includes(ext)) {
                    callback(new BadRequestException('Only image files are allowed'), false);
                    return;
                }
                callback(null, true);
            },
            limits: {
                fileSize: maxFileSize,
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        return {
            filename: file.filename,
            url: `/uploads/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype,
        };
    }

    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join(process.cwd(), 'uploads', filename);

        if (!existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        return res.sendFile(filePath);
    }
}
