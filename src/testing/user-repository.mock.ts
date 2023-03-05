import { getRepositoryToken } from "@nestjs/typeorm";
import { users } from "../User/entity/user.entity";

export const userRepositoryMock = {
  provide: getRepositoryToken(users),
  useValue: {
    exist: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};
