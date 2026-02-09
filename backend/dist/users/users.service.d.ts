import { Model } from 'mongoose';
import { UserDocument, UserRole } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(username: string, password: string, role?: UserRole): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    createInitialAdmin(): Promise<void>;
}
