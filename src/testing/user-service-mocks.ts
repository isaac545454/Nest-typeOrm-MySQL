import { UserService } from "../User/user.service";

export const UserServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn(),
    update: jest.fn(),
    updatePartial: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  },
};
