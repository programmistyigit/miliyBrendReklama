import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthTokens>;
    refresh(req: any): Promise<import("./auth.service").AuthTokens>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
