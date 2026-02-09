import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        filename: string;
        url: string;
        size: number;
        mimetype: string;
    };
    getFile(filename: string, res: Response): void | Response<any, Record<string, any>>;
}
