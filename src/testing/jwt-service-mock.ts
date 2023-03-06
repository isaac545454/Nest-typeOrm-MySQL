import { JwtService } from "@nestjs/jwt";

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
};
