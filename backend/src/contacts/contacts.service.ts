import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class ContactsService {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
        private telegramService: TelegramService,
    ) { }

    async create(createContactDto: CreateContactDto): Promise<ContactDocument> {
        const contact = new this.contactModel(createContactDto);
        const saved = await contact.save();

        // Send notification to Telegram
        await this.telegramService.sendContactNotification(saved);

        return saved;
    }

    async findAll(): Promise<ContactDocument[]> {
        return this.contactModel.find().sort({ createdAt: -1 }).exec();
    }

    async findNew(): Promise<ContactDocument[]> {
        return this.contactModel.find({ status: 'new' }).sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<ContactDocument> {
        const contact = await this.contactModel.findById(id);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }

    async update(id: string, updateContactDto: UpdateContactDto): Promise<ContactDocument> {
        const contact = await this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true });
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }

    async remove(id: string): Promise<void> {
        const result = await this.contactModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException('Contact not found');
        }
    }

    async getStats(): Promise<{ total: number; new: number; reviewed: number }> {
        const total = await this.contactModel.countDocuments();
        const newCount = await this.contactModel.countDocuments({ status: 'new' });
        return {
            total,
            new: newCount,
            reviewed: total - newCount,
        };
    }
}
