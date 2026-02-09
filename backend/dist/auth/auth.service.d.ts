import { OnModuleInit } from '@nestjs/common';
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
export declare class AuthService implements OnModuleInit {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    validateUser(username: string, password: string): Promise<UserDocument | null>;
    login(username: string, password: string): Promise<AuthTokens>;
    refreshTokens(userId: string, refreshToken: string): Promise<AuthTokens>;
    logout(userId: string): Promise<void>;
    private generateTokens;
}
