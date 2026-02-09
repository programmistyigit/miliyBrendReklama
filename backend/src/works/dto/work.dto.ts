import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TranslatedText {
    @IsString()
    uz: string;

    @IsString()
    ru: string;

    @IsString()
    en: string;
}

export class CreateWorkDto {
    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    title: TranslatedText;

    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    description: TranslatedText;

    @IsString()
    image: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsString()
    @IsOptional()
    status?: string;
}

export class UpdateWorkDto {
    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    @IsOptional()
    title?: TranslatedText;

    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    @IsOptional()
    description?: TranslatedText;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
