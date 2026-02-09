import { ServiceCategory } from '../schemas/service.schema';
declare class TranslatedText {
    uz: string;
    ru: string;
    en: string;
}
export declare class CreateServiceDto {
    name: TranslatedText;
    description: TranslatedText;
    icon: string;
    image?: string;
    category: ServiceCategory;
    order?: number;
    status?: string;
}
export declare class UpdateServiceDto {
    name?: TranslatedText;
    description?: TranslatedText;
    icon?: string;
    image?: string;
    category?: ServiceCategory;
    status?: string;
    order?: number;
}
export {};
