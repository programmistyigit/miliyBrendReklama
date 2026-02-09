"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const telegram_service_1 = require("../telegram/telegram.service");
let OrdersService = class OrdersService {
    constructor(orderModel, telegramService) {
        this.orderModel = orderModel;
        this.telegramService = telegramService;
    }
    async create(createOrderDto) {
        const order = new this.orderModel(createOrderDto);
        const saved = await order.save();
        await this.telegramService.sendOrderNotification(saved);
        return saved;
    }
    async findAll() {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }
    async findNew() {
        return this.orderModel.find({ status: order_schema_1.OrderStatus.NEW }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async remove(id) {
        const result = await this.orderModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('Order not found');
        }
    }
    async getStats() {
        const total = await this.orderModel.countDocuments();
        const newCount = await this.orderModel.countDocuments({ status: order_schema_1.OrderStatus.NEW });
        const inProgress = await this.orderModel.countDocuments({ status: order_schema_1.OrderStatus.IN_PROGRESS });
        const completed = await this.orderModel.countDocuments({ status: order_schema_1.OrderStatus.COMPLETED });
        return {
            total,
            new: newCount,
            inProgress,
            completed,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        telegram_service_1.TelegramService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map