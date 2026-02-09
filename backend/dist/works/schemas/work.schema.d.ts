import { Document } from 'mongoose';
export type WorkDocument = Work & Document;
export declare class Work {
    title: {
        uz: string;
        ru: string;
        en: string;
    };
    description: {
        uz: string;
        ru: string;
        en: string;
    };
    image: string;
    category: string;
    status: string;
}
export declare const WorkSchema: import("mongoose").Schema<Work, import("mongoose").Model<Work, any, any, any, Document<unknown, any, Work, any, {}> & Work & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Work, Document<unknown, {}, import("mongoose").FlatRecord<Work>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Work> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
