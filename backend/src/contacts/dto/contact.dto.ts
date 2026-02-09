import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[0-9\s\-()]{7,20}$/, { message: 'Invalid phone number format' })
    phone: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}

export class UpdateContactDto {
    @IsString()
    status?: string;
}
