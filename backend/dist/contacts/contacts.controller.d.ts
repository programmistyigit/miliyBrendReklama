import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<import("./schemas/contact.schema").ContactDocument>;
    findAll(): Promise<import("./schemas/contact.schema").ContactDocument[]>;
    findNew(): Promise<import("./schemas/contact.schema").ContactDocument[]>;
    getStats(): Promise<{
        total: number;
        new: number;
        reviewed: number;
    }>;
    findOne(id: string): Promise<import("./schemas/contact.schema").ContactDocument>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<import("./schemas/contact.schema").ContactDocument>;
    remove(id: string): Promise<void>;
}
