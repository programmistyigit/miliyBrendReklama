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
exports.WorksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const work_schema_1 = require("./schemas/work.schema");
let WorksService = class WorksService {
    constructor(workModel) {
        this.workModel = workModel;
    }
    async create(createWorkDto) {
        const work = new this.workModel(createWorkDto);
        return work.save();
    }
    async findAll() {
        return this.workModel.find().sort({ createdAt: -1 }).exec();
    }
    async findActive() {
        return this.workModel.find({ status: 'active' }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const work = await this.workModel.findById(id);
        if (!work) {
            throw new common_1.NotFoundException('Work not found');
        }
        return work;
    }
    async update(id, updateWorkDto) {
        const work = await this.workModel.findByIdAndUpdate(id, updateWorkDto, { new: true });
        if (!work) {
            throw new common_1.NotFoundException('Work not found');
        }
        return work;
    }
    async remove(id) {
        const result = await this.workModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('Work not found');
        }
    }
    async getStats() {
        const total = await this.workModel.countDocuments();
        const active = await this.workModel.countDocuments({ status: 'active' });
        return {
            total,
            active,
            inactive: total - active,
        };
    }
};
exports.WorksService = WorksService;
exports.WorksService = WorksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(work_schema_1.Work.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorksService);
//# sourceMappingURL=works.service.js.map