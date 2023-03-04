import { forwardRef, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./User/user.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./User/entity/user.entity";
@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
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
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === "develop",
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
