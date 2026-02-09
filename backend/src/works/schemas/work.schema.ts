import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Work & Document;

@Schema({ timestamps: true })
export class Work {
    @Prop({ type: Object, required: true })
    title: {
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
    image: string;

    @Prop()
    category: string;

    @Prop({ default: 'active', enum: ['active', 'inactive'] })
    status: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
