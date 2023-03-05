/// <reference types="multer" />
export declare class FileService {
    upload(file: Express.Multer.File, path: string): Promise<void>;
}
