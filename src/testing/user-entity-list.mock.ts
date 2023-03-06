import { Role } from "../enums/role.enum";
import { users } from "../User/entity/user.entity";
export const ListUserEntity: users[] = [
  {
    id: 2,
    email: "email@example.com",
    name: "John",
    password: "$2b$10$kaAZudryxEOVmGhcdh4jauGNxitTIWZdz1hIcfHY10fiXKVFDtB2G",
    role: Role.admin,
    birthAt: null,
  },
  {
    id: 4,
    email: "email222@example.com",
    name: "John2222",
    password: "$2b$10$kaAZudryxEOVmGhcdh4jauGNxitTIWZdz1hIcfHY10fiXKVFDtB2G",
    role: Role.admin,
    birthAt: null,
  },
];
