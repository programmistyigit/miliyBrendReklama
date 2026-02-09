import { Model } from 'mongoose';
import { ContactDocument } from './schemas/contact.schema';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { TelegramService } from '../telegram/telegram.service';
export declare class ContactsService {
    private contactModel;
    private telegramService;
    constructor(contactModel: Model<ContactDocument>, telegramService: TelegramService);
    create(createContactDto: CreateContactDto): Promise<ContactDocument>;
    findAll(): Promise<ContactDocument[]>;
    findNew(): Promise<ContactDocument[]>;
    findOne(id: string): Promise<ContactDocument>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<ContactDocument>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        total: number;
        new: number;
        reviewed: number;
    }>;
}
