import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../guards/auth.guard";
import { guardMock } from "../testing/auth-guard.mock";
import { authServiceMock } from "../testing/auth-service.mock";
import { AuthController } from "./auth.controller";
import { authLoginDTOMOCK } from "../testing/auth-login-dto.mock";
import { acessToken } from "../testing/token.mock";
import { authRegisterDTO } from "../testing/auth-register-dto";
import { fileServiceMock } from "../testing/file-service.mock";
import { authForgetDTOMOCK } from "../testing/auth-forget-dto.mock";
import { authResettDTOMOCK } from "../testing/auth-reset-dto.mock";
import { ListUserEntity } from "../testing/user-entity-list.mock";
import { getPhoto } from "../testing/get-foto.mock";

describe("UserController", () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)

      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test("validação de definição ", () => {
    expect(authController).toBeDefined();
  });

  describe("fluxo de autenticação", () => {
    test("method login", async () => {
      const result = await authController.login(authLoginDTOMOCK);
      expect(result).toEqual({ acessToken });
    });
    test("method register", async () => {
      const result = await authController.login(authRegisterDTO);
      expect(result).toEqual({ acessToken });
    });
    test("method forget", async () => {
      const result = await authController.forget(authForgetDTOMOCK);
      expect(result).toEqual(true);
    });
    test("method reset", async () => {
      const result = await authController.reset(authResettDTOMOCK);
      expect(result).toEqual({ acessToken });
    });
  });

  describe("rotas autenticadas ", () => {
    test("method me", async () => {
      const result = await authController.me(ListUserEntity[0]);
      expect(result).toEqual(ListUserEntity[0]);
    });
    test("method me", async () => {
      const result = await authController.upload(
        ListUserEntity[0],
        await getPhoto()
      );
      expect(result).toEqual({ sucess: true });
    });
  });
});
