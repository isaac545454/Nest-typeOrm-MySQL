import { JwtService } from "@nestjs/jwt";
import { JwtPayloadMoch } from "./jwt-payload.moch";
import { acessToken } from "./token.mock";

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(acessToken),
    verify: jest.fn().mockReturnValue(JwtPayloadMoch),
  },
};
