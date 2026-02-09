import { OrderType } from '../schemas/order.schema';
export declare class CreateOrderDto {
    name: string;
    phone: string;
    serviceId?: string;
    workId?: string;
    serviceName?: string;
    workName?: string;
    type: OrderType;
    source?: string;
}
export declare class UpdateOrderDto {
    status?: string;
}
