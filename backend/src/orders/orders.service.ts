import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private telegramService: TelegramService,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
        const order = new this.orderModel(createOrderDto);
        const saved = await order.save();

        // Send notification to Telegram
        await this.telegramService.sendOrderNotification(saved);

        return saved;
    }

    async findAll(): Promise<OrderDocument[]> {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }

    async findNew(): Promise<OrderDocument[]> {
        return this.orderModel.find({ status: OrderStatus.NEW }).sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<OrderDocument> {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDocument> {
        const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async remove(id: string): Promise<void> {
        const result = await this.orderModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException('Order not found');
        }
    }

    async getStats(): Promise<{ total: number; new: number; inProgress: number; completed: number }> {
        const total = await this.orderModel.countDocuments();
        const newCount = await this.orderModel.countDocuments({ status: OrderStatus.NEW });
        const inProgress = await this.orderModel.countDocuments({ status: OrderStatus.IN_PROGRESS });
        const completed = await this.orderModel.countDocuments({ status: OrderStatus.COMPLETED });
        return {
            total,
            new: newCount,
            inProgress,
            completed,
        };
    }
}
