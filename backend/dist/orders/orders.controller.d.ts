import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./schemas/order.schema").OrderDocument>;
    findAll(): Promise<import("./schemas/order.schema").OrderDocument[]>;
    findNew(): Promise<import("./schemas/order.schema").OrderDocument[]>;
    getStats(): Promise<{
        total: number;
        new: number;
        inProgress: number;
        completed: number;
    }>;
    findOne(id: string): Promise<import("./schemas/order.schema").OrderDocument>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./schemas/order.schema").OrderDocument>;
    remove(id: string): Promise<void>;
}
