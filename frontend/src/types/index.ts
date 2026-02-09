export interface Work {
    _id: string;
    title: {
        uz: string;
        ru: string;
        en: string;
    };
    description: {
        uz: string;
        ru: string;
        en: string;
    };
    image: string;
    category?: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface Service {
    _id: string;
    name: {
        uz: string;
        ru: string;
        en: string;
    };
    description: {
        uz: string;
        ru: string;
        en: string;
    };
    icon: string;
    image?: string;
    category: 'poligrafiya' | 'tashqi_reklama' | 'ichki_reklama' | 'dizayn' | 'raqamli_it' | 'souvenir_promo' | 'ishlab_chiqarish';
    status: 'active' | 'inactive';
    order: number;
}

export interface Contact {
    _id: string;
    name: string;
    phone: string;
    message: string;
    status: 'new' | 'reviewed';
    createdAt: string;
}

export interface Order {
    _id: string;
    name: string;
    phone: string;
    serviceId?: string;
    workId?: string;
    serviceName?: string;
    workName?: string;
    type: 'service' | 'similar_work';
    status: 'new' | 'in_progress' | 'completed';
    source?: string;
    createdAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    sub: string;
    username: string;
    role: 'ADMIN' | 'USER';
}

export type Language = 'uz' | 'ru' | 'en';
