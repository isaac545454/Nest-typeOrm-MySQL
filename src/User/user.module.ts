import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check-middlewares";
import { UserEntity } from "./entity/user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
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
