import { IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceCategory } from '../schemas/service.schema';

class TranslatedText {
    @IsString()
    uz: string;

    @IsString()
    ru: string;

    @IsString()
    en: string;
}

export class CreateServiceDto {
    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    name: TranslatedText;

    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    description: TranslatedText;

    @IsString()
    icon: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsEnum(ServiceCategory)
    category: ServiceCategory;

    @IsNumber()
    @IsOptional()
    order?: number;

    @IsString()
    @IsOptional()
    status?: string;
}

export class UpdateServiceDto {
    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    @IsOptional()
    name?: TranslatedText;

    @IsObject()
    @ValidateNested()
    @Type(() => TranslatedText)
    @IsOptional()
    description?: TranslatedText;

    @IsString()
    @IsOptional()
    icon?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsEnum(ServiceCategory)
    @IsOptional()
    category?: ServiceCategory;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    order?: number;
}
