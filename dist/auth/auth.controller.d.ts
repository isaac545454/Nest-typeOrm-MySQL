/// <reference types="multer" />
import { UserService } from "src/User/user.service";
import { AuhtService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { AuthResetDTO } from "./dto/auth-reset-dto";
import { FileService } from "src/file/file.service";
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly fileService;
    constructor(userService: UserService, authService: AuhtService, fileService: FileService);
    login({ email, password }: AuthLoginDTO): Promise<{
        acessTokem: string;
    }>;
    register(body: AuthRegisterDTO): Promise<{
        acessTokem: string;
    }>;
    forget({ email }: AuthForgetDTO): Promise<boolean>;
    reset({ password, token }: AuthResetDTO): Promise<{
        acessTokem: string;
    }>;
    me(user: any): Promise<{
        user: any;
    }>;
    upload(user: any, photo: Express.Multer.File): Promise<{
        sucess: boolean;
    }>;
}
