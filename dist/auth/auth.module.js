"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const file_module_1 = require("../file/file.module");
const user_entity_1 = require("../User/entity/user.entity");
const user_module_1 = require("../User/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: String(process.env.SECRET),
            }),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            file_module_1.FileModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuhtService],
        exports: [auth_service_1.AuhtService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map