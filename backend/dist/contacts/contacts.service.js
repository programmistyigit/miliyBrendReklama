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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contact_schema_1 = require("./schemas/contact.schema");
const telegram_service_1 = require("../telegram/telegram.service");
let ContactsService = class ContactsService {
    constructor(contactModel, telegramService) {
        this.contactModel = contactModel;
        this.telegramService = telegramService;
    }
    async create(createContactDto) {
        const contact = new this.contactModel(createContactDto);
        const saved = await contact.save();
        await this.telegramService.sendContactNotification(saved);
        return saved;
    }
    async findAll() {
        return this.contactModel.find().sort({ createdAt: -1 }).exec();
    }
    async findNew() {
        return this.contactModel.find({ status: 'new' }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const contact = await this.contactModel.findById(id);
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contact;
    }
    async update(id, updateContactDto) {
        const contact = await this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contact;
    }
    async remove(id) {
        const result = await this.contactModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('Contact not found');
        }
    }
    async getStats() {
        const total = await this.contactModel.countDocuments();
        const newCount = await this.contactModel.countDocuments({ status: 'new' });
        return {
            total,
            new: newCount,
            reviewed: total - newCount,
        };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contact_schema_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        telegram_service_1.TelegramService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map