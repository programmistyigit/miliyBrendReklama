import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderType {
    SERVICE = 'service',
    SIMILAR_WORK = 'similar_work',
}

export enum OrderStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ type: Types.ObjectId, ref: 'Service' })
    serviceId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Work' })
    workId?: Types.ObjectId;

    @Prop()
    serviceName?: string;

    @Prop()
    workName?: string;

    @Prop({ type: String, enum: OrderType, required: true })
    type: OrderType;

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.NEW })
    status: OrderStatus;

    @Prop()
    source?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
