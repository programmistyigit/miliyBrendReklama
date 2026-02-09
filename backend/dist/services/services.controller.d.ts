import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { ServiceCategory } from './schemas/service.schema';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findActive(): Promise<import("./schemas/service.schema").ServiceDocument[]>;
    findByCategory(category: ServiceCategory): Promise<import("./schemas/service.schema").ServiceDocument[]>;
    findOne(id: string): Promise<import("./schemas/service.schema").ServiceDocument>;
    findAll(): Promise<import("./schemas/service.schema").ServiceDocument[]>;
    create(createServiceDto: CreateServiceDto): Promise<import("./schemas/service.schema").ServiceDocument>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("./schemas/service.schema").ServiceDocument>;
    remove(id: string): Promise<void>;
}
