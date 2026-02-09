import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { TelegramService } from '../telegram/telegram.service';
export declare class OrdersService {
    private orderModel;
    private telegramService;
    constructor(orderModel: Model<OrderDocument>, telegramService: TelegramService);
    create(createOrderDto: CreateOrderDto): Promise<OrderDocument>;
    findAll(): Promise<OrderDocument[]>;
    findNew(): Promise<OrderDocument[]>;
    findOne(id: string): Promise<OrderDocument>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDocument>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        total: number;
        new: number;
        inProgress: number;
        completed: number;
    }>;
}
