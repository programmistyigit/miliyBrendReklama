import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

export interface JwtPayload {
    sub: string;
    username: string;
    role: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async onModuleInit() {
        await this.usersService.createInitialAdmin();
    }

    async validateUser(username: string, password: string): Promise<UserDocument | null> {
        const user = await this.usersService.findByUsername(username);
        if (user && await this.usersService.validatePassword(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(username: string, password: string): Promise<AuthTokens> {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(user._id.toString(), tokens.refreshToken);
        return tokens;
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<AuthTokens> {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Access denied');
        }

        if (user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Access denied');
        }

        const tokens = await this.generateTokens(user);
        await this.usersService.updateRefreshToken(userId, tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string): Promise<void> {
        await this.usersService.updateRefreshToken(userId, null);
    }

    private async generateTokens(user: UserDocument): Promise<AuthTokens> {
        const payload: JwtPayload = {
            sub: user._id.toString(),
            username: user.username,
            role: user.role,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
            }),
        ]);

        return { accessToken, refreshToken };
    }
}
