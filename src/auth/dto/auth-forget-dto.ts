import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AuthForgetDTO {
  @ApiProperty({
    example: "isaac@gmail.com",
    description: "email do usuario",
  })
  @IsEmail()
  email: string;
}
