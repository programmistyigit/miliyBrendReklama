import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
        forwardRef(() => TelegramModule),
    ],
    controllers: [ContactsController],
    providers: [ContactsService],
    exports: [ContactsService],
})
export class ContactsModule { }
