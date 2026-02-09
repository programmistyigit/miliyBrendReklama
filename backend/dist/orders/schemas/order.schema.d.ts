import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
export declare enum OrderType {
    SERVICE = "service",
    SIMILAR_WORK = "similar_work"
}
export declare enum OrderStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Order {
    name: string;
    phone: string;
    serviceId?: Types.ObjectId;
    workId?: Types.ObjectId;
    serviceName?: string;
    workName?: string;
    type: OrderType;
    status: OrderStatus;
    source?: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, {}> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
