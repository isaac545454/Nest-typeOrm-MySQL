import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/User/user.service";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { MailerService } from "@nestjs-modules/mailer";
import { UserEntity } from "src/User/entity/user.entity";
import { Repository } from "typeorm";
export declare class AuhtService {
    private readonly jwtservice;
    private userRepository;
    private readonly userService;
    private readonly mailer;
    private audience;
    private issuer;
    constructor(jwtservice: JwtService, userRepository: Repository<UserEntity>, userService: UserService, mailer: MailerService);
    createToken(user: UserEntity): {
        acessTokem: string;
    };
    checkToken(token: string): any;
    isValidation(token: string): boolean;
    login(email: string, password: string): Promise<{
        acessTokem: string;
    }>;
    forget(email: string): Promise<boolean>;
    reset(password: string, token: string): Promise<{
        acessTokem: string;
    }>;
    register(data: AuthRegisterDTO): Promise<{
        acessTokem: string;
    }>;
}
