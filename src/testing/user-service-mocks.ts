import { UserService } from "../User/user.service";
import { ListUserEntity } from "./user-entity-list.mock";

export const UserServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockResolvedValue(ListUserEntity[0]),
    update: jest.fn().mockResolvedValue(ListUserEntity[0]),
    updatePartial: jest.fn().mockResolvedValue(ListUserEntity[0]),
    findAll: jest.fn().mockResolvedValue(ListUserEntity),
    findOne: jest.fn().mockResolvedValue(ListUserEntity[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
