"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuhtService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../User/user.service");
const brypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("../User/entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuhtService = class AuhtService {
    constructor(jwtservice, userRepository, userService, mailer) {
        this.jwtservice = jwtservice;
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailer = mailer;
        this.audience = "user";
        this.issuer = "login";
    }
    createToken(user) {
        return {
            acessTokem: this.jwtservice.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,
            }),
        };
    }
    checkToken(token) {
        try {
            const data = this.jwtservice.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    isValidation(token) {
        try {
            this.checkToken(token);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        console.log("email" + user);
        if (!user)
            throw new common_1.UnauthorizedException("Email ou senha incorretos.");
        if (!(await brypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("Email ou senha incorretos.");
        }
        return this.createToken(user);
    }
    async forget(email) {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException("Email incorretos.");
        const token = this.jwtservice.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: "forget",
            audience: this.audience,
        });
        await this.mailer.sendMail({
            subject: "Recuperação de senha",
            to: "isaac@dev.com.br",
            template: "forget",
            context: {
                name: user.name,
                token,
            },
        });
        return true;
    }
    async reset(password, token) {
        try {
            const { id: idToken } = this.jwtservice.verify(token, {
                issuer: "forget",
                audience: this.audience,
            });
            if (isNaN(Number(idToken))) {
                throw new common_1.BadRequestException("Token invalido");
            }
            const salt = await brypt.genSalt();
            password = await brypt.hash(password, salt);
            await this.userRepository.update(Number(idToken), {
                password,
            });
            const user = await this.userService.findOne(Number(idToken));
            return this.createToken(user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async register(data) {
        console.log("password" + data.password);
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
};
AuhtService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        user_service_1.UserService,
        mailer_1.MailerService])
], AuhtService);
exports.AuhtService = AuhtService;
//# sourceMappingURL=auth.service.js.map