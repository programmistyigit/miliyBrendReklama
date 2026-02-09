import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

export enum ServiceCategory {
    POLIGRAFIYA = 'poligrafiya',
    TASHQI_REKLAMA = 'tashqi_reklama',
    ICHKI_REKLAMA = 'ichki_reklama',
    DIZAYN = 'dizayn',
    RAQAMLI_IT = 'raqamli_it',
    SOUVENIR_PROMO = 'souvenir_promo',
    ISHLAB_CHIQARISH = 'ishlab_chiqarish',
}

@Schema({ timestamps: true })
export class Service {
    @Prop({ type: Object, required: true })
    name: {
        uz: string;
        ru: string;
        en: string;
    };

    @Prop({ type: Object, required: true })
    description: {
        uz: string;
        ru: string;
        en: string;
    };

    @Prop({ required: true })
    icon: string;

    @Prop()
    image?: string;

    @Prop({ type: String, enum: ServiceCategory, required: true })
    category: ServiceCategory;

    @Prop({ default: 'active', enum: ['active', 'inactive'] })
    status: string;

    @Prop({ default: 0 })
    order: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

