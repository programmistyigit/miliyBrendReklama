declare class TranslatedText {
    uz: string;
    ru: string;
    en: string;
}
export declare class CreateWorkDto {
    title: TranslatedText;
    description: TranslatedText;
    image: string;
    category?: string;
    status?: string;
}
export declare class UpdateWorkDto {
    title?: TranslatedText;
    description?: TranslatedText;
    image?: string;
    category?: string;
    status?: string;
}
export {};
