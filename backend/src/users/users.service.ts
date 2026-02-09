import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument, UserRole } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(username: string, password: string, role: UserRole = UserRole.USER): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ username });
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            username,
            password: hashedPassword,
            role,
        });
        return user.save();
    }

    async findByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, { refreshToken });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async createInitialAdmin(): Promise<void> {
        const adminExists = await this.userModel.findOne({ role: UserRole.ADMIN });
        if (!adminExists) {
            await this.create('admin', 'admin123', UserRole.ADMIN);
            console.log('✅ Initial admin user created: admin / admin123');
        }
    }
}
