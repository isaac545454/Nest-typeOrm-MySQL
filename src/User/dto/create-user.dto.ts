import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsEnum,
} from "class-validator";
import { Role } from "../../enums/role.enum";

export class CreateUserDTO {
  /**
   * O nome sera o nome do usuario
   * informações da pessoa conectada.
   * @example isaac
   */

  @IsString()
  name: string;

  /**
   * O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir
   * informações da pessoa conectada.
   * @example  isaac.newton2222@gmail.com
   *    */
  @IsEmail()
  email: string;

  /**
   *a senha precisa conter caracteres especiais , numeros e letras maiusculas
   * informações da pessoa conectada.
   * @example  "2022-09-27 18:00:00.000"
   *    */
  @IsOptional()
  @IsDateString()
  birthAt?: string;

  /**
   * data de nascimento do usuario
   * informações da pessoa conectada.
   * @example  Teste@01
   *    */
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  /**
   * tipo de usuario
   * informações da pessoa conectada.
   * @example  1
   *    */
  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
