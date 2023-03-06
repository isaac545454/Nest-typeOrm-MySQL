import { JwtService } from "@nestjs/jwt";

export const UserServiceMock = {
  provide: JwtService,
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
