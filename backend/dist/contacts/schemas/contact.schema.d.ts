import { Document } from 'mongoose';
export type ContactDocument = Contact & Document;
export declare class Contact {
    name: string;
    phone: string;
    message: string;
    status: string;
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, Document<unknown, any, Contact, any, {}> & Contact & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, Document<unknown, {}, import("mongoose").FlatRecord<Contact>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Contact> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
