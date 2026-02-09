import { Model } from 'mongoose';
import { WorkDocument } from './schemas/work.schema';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';
export declare class WorksService {
    private workModel;
    constructor(workModel: Model<WorkDocument>);
    create(createWorkDto: CreateWorkDto): Promise<WorkDocument>;
    findAll(): Promise<WorkDocument[]>;
    findActive(): Promise<WorkDocument[]>;
    findOne(id: string): Promise<WorkDocument>;
    update(id: string, updateWorkDto: UpdateWorkDto): Promise<WorkDocument>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
    }>;
}
