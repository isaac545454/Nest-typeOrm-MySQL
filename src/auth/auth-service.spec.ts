import { Test, TestingModule } from "@nestjs/testing";
import { JwtServiceMock } from "../testing/jwt-service-mock";
import { MailerServiceMock } from "../testing/mailer-service.mock";
import { ListUserEntity } from "../testing/user-entity-list.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { UserServiceMock } from "../testing/user-service-mocks";
import { acessToken } from "../testing/token.mock";
import { AuhtService } from "./auth.service";
import { JwtPayloadMoch } from "../testing/jwt-payload.moch";
import { resetToken } from "../testing/reset-token.mock";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { authRegisterDTO } from "../testing/auth-register-dto";

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
    test("method checkedToke", () => {
      const results = authService.checkToken(acessToken);

      expect(results).toEqual(JwtPayloadMoch);
    });
    test("method isValididTiken", () => {
      const results = authService.isValidation(acessToken);

      expect(results).toEqual(true);
    });
  });

  describe("authentication", () => {
    test("method login", async () => {
      const results = await authService.login(
        "isaac.newton1221@gmail.com",
        "Teste@01"
      );

      expect(results).toEqual({ acessToken: acessToken });
    });
    test("method forget", async () => {
      const results = await authService.forget("isaac.newton1221@gmail.com");

      expect(results).toEqual(true);
    });
    test("method reset", async () => {
      const results = await authService.reset("Teste@02", resetToken);

      expect(results).toEqual({ acessToken });
    });

    test("method register", async () => {
      const results = await authService.register(authRegisterDTO);

      expect(results).toEqual({ acessToken });
    });
  });
});
