import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { ServiceDocument, ServiceCategory } from './schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesService implements OnModuleInit {
    private serviceModel;
    constructor(serviceModel: Model<ServiceDocument>);
    onModuleInit(): Promise<void>;
    create(createServiceDto: CreateServiceDto): Promise<ServiceDocument>;
    findAll(): Promise<ServiceDocument[]>;
    findActive(): Promise<ServiceDocument[]>;
    findByCategory(category: ServiceCategory): Promise<ServiceDocument[]>;
    findOne(id: string): Promise<ServiceDocument>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDocument>;
    remove(id: string): Promise<void>;
    private seedServices;
}
