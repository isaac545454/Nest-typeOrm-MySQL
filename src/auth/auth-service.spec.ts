import { Test, TestingModule } from "@nestjs/testing";
import { JwtServiceMock } from "../testing/jwt-service-mock";
import { MailerServiceMock } from "../testing/mailer-service.mock";
import { ListUserEntity } from "../testing/user-entity-list.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { UserServiceMock } from "../testing/user-service-mocks";
import { acessToken } from "../testing/token.mock";
import { AuhtService } from "./auth.service";

describe("authService", () => {
  let authService: AuhtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuhtService,
        JwtServiceMock,
        userRepositoryMock,
        UserServiceMock,
        MailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuhtService>(AuhtService);
  });

  test("Validar definição", () => {
    expect(authService).toBeDefined();
  });

  describe("token", () => {
    test("method cratedToken", () => {
      const results = authService.createToken(ListUserEntity[0]);

      expect(results).toEqual({
        acessToken: acessToken,
      });
    });
  });

  describe("authentication", () => {
    //
  });
});
