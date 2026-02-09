import { IsString, IsNotEmpty, IsOptional, IsEnum, Matches } from 'class-validator';
import { OrderType } from '../schemas/order.schema';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[0-9\s\-()]{7,20}$/, { message: 'Invalid phone number format' })
    phone: string;

    @IsString()
    @IsOptional()
    serviceId?: string;

    @IsString()
    @IsOptional()
    workId?: string;

    @IsString()
    @IsOptional()
    serviceName?: string;

    @IsString()
    @IsOptional()
    workName?: string;

    @IsEnum(OrderType)
    type: OrderType;

    @IsString()
    @IsOptional()
    source?: string;
}

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    status?: string;
}
