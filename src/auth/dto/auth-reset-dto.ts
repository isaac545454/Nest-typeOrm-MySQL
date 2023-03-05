import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
  @ApiProperty({
    example: "Teste@01",
    description: "senha do usuario",
  })
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImlzYWFjIiwiZW1haWwiOiJpc2FhYy5uZXd0b24yMjIyQGdtYWlsLmNvbSIsImlhdCI6MTY3ODAwODAzOCwiZXhwIjoxNjc4NjEyODM4LCJhdWQiOiJ1c2VyIiwiaXNzIjoibG9naW4iLCJzdWIiOiIyIn0.pSoY7ZkSoOqhZ6EyRlACsIsG2X3Wo0_1cruFjZn4Y2k",
    description: "token de acesso",
  })
  @IsJWT()
  token: string;
}
