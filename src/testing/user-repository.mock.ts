import { getRepositoryToken } from "@nestjs/typeorm";
import { users } from "../User/entity/user.entity";
import { acessToken } from "./token.mock";
import { ListUserEntity } from "./user-entity-list.mock";

export const userRepositoryMock = {
  provide: getRepositoryToken(users),
  useValue: {
    exist: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockResolvedValue(ListUserEntity[0]),
    update: jest.fn().mockResolvedValue(ListUserEntity[0]),
    find: jest.fn().mockResolvedValue(ListUserEntity),
    findOneBy: jest.fn().mockResolvedValue(ListUserEntity[0]),
    delete: jest.fn(),
    findOne: jest.fn().mockReturnValue(ListUserEntity[0]),
    count: jest.fn().mockResolvedValue(true),
  },
};
