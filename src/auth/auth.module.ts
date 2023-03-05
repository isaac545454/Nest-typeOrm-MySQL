import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { users } from "../User/entity/user.entity";
import { FileModule } from "../file/file.module";
import { UserModule } from "../User/user.module";

import { AuthController } from "./auth.controller";
import { AuhtService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.SECRET),
    }),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([users]),
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuhtService],
  exports: [AuhtService],
})
export class AuthModule {}
