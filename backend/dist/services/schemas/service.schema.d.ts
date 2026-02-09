import { Document } from 'mongoose';
export type ServiceDocument = Service & Document;
export declare enum ServiceCategory {
    POLIGRAFIYA = "poligrafiya",
    TASHQI_REKLAMA = "tashqi_reklama",
    ICHKI_REKLAMA = "ichki_reklama",
    DIZAYN = "dizayn",
    RAQAMLI_IT = "raqamli_it",
    SOUVENIR_PROMO = "souvenir_promo",
    ISHLAB_CHIQARISH = "ishlab_chiqarish"
}
export declare class Service {
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
    category: ServiceCategory;
    status: string;
    order: number;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, Document<unknown, any, Service, any, {}> & Service & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, Document<unknown, {}, import("mongoose").FlatRecord<Service>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Service> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
