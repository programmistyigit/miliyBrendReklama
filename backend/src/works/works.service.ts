import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work, WorkDocument } from './schemas/work.schema';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';

@Injectable()
export class WorksService {
    constructor(@InjectModel(Work.name) private workModel: Model<WorkDocument>) { }

    async create(createWorkDto: CreateWorkDto): Promise<WorkDocument> {
        const work = new this.workModel(createWorkDto);
        return work.save();
    }

    async findAll(): Promise<WorkDocument[]> {
        return this.workModel.find().sort({ createdAt: -1 }).exec();
    }

    async findActive(): Promise<WorkDocument[]> {
        return this.workModel.find({ status: 'active' }).sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<WorkDocument> {
        const work = await this.workModel.findById(id);
        if (!work) {
            throw new NotFoundException('Work not found');
        }
        return work;
    }

    async update(id: string, updateWorkDto: UpdateWorkDto): Promise<WorkDocument> {
        const work = await this.workModel.findByIdAndUpdate(id, updateWorkDto, { new: true });
        if (!work) {
            throw new NotFoundException('Work not found');
        }
        return work;
    }

    async remove(id: string): Promise<void> {
        const result = await this.workModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException('Work not found');
        }
    }

    async getStats(): Promise<{ total: number; active: number; inactive: number }> {
        const total = await this.workModel.countDocuments();
        const active = await this.workModel.countDocuments({ status: 'active' });
        return {
            total,
            active,
            inactive: total - active,
        };
    }
}
