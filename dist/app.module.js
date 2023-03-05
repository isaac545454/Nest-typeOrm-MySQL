"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./User/user.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./User/entity/user.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 1000,
            }),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.ethereal.email",
                    port: 587,
                    auth: {
                        user: "tyler.renner@ethereal.email",
                        pass: "3Mg3NBWhUrJe1vKnXE",
                    },
                },
                defaults: {
                    from: '"nest-modules" <willis.daugherty71@ethereal.email>',
                },
                template: {
                    dir: __dirname + "/template",
                    adapter: new pug_adapter_1.PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [user_entity_1.UserEntity],
                synchronize: process.env.ENV === "develop",
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map