import { JwtService } from "@nestjs/jwt";
import { acessToken } from "./token.mock";

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(acessToken),
    verify: jest.fn(),
  },
};
