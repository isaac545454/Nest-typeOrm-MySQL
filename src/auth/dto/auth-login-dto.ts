import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
  @IsEmail()
  @ApiProperty({
    example: "isaac.newton2222@gmail.com",
    description: "email do usuario",
  })
  email: string;

  @ApiProperty({
    example: "Teste@01",
    description: "senha do usuario",
  })
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
