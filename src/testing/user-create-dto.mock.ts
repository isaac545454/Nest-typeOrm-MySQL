import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../User/dto/create-user.dto";

export const userCreateDTOMock: CreateUserDTO = {
  email: "email@example.com",
  name: "John",
  password: "Teste@02",
  role: Role.User,
  birthAt: null,
};
