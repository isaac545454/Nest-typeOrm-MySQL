import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileModule } from "src/file/file.module";
import { UserEntity } from "src/User/entity/user.entity";
import { UserModule } from "src/User/user.module";
import { AuthController } from "./auth.controller";
import { AuhtService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UserEntity]),
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuhtService],
  exports: [AuhtService],
})
export class AuthModule {}
