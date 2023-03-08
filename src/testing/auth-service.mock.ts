import { AuhtService } from "../auth/auth.service";
import { acessToken } from "./token.mock";
import { JwtPayloadMoch } from "./jwt-payload.moch";

export const authServiceMock = {
  provide: AuhtService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ acessToken }),
    checkToken: jest.fn().mockReturnValue(JwtPayloadMoch),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ acessToken }),
    forget: jest.fn().mockResolvedValue(true),
    reset: jest.fn().mockResolvedValue({ acessToken }),
    register: jest.fn().mockResolvedValue({ acessToken }),
  },
};
