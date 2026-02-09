import { WorksService } from './works.service';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';
export declare class WorksController {
    private readonly worksService;
    constructor(worksService: WorksService);
    findActive(): Promise<import("./schemas/work.schema").WorkDocument[]>;
    findOne(id: string): Promise<import("./schemas/work.schema").WorkDocument>;
    findAll(): Promise<import("./schemas/work.schema").WorkDocument[]>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
    }>;
    create(createWorkDto: CreateWorkDto): Promise<import("./schemas/work.schema").WorkDocument>;
    update(id: string, updateWorkDto: UpdateWorkDto): Promise<import("./schemas/work.schema").WorkDocument>;
    remove(id: string): Promise<void>;
}
