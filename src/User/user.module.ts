import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserIdCheckMiddleware } from "../middlewares/user-id-check-middlewares";

import { users } from "./entity/user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([users])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: "users/:id",
      method: RequestMethod.ALL,
    });
  }
}
