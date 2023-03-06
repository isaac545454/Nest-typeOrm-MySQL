import { Role } from "../enums/role.enum";

import { UpdateUserDTO } from "../User/dto/update-user.dto";

export const UserUpdatePutDTOMock: UpdateUserDTO = {
  email: "email@example.com",
  name: "John",
  password: "Teste@02",
  role: Role.User,
  birthAt: null,
};
