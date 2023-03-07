import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { guardMock } from "../testing/auth-guard.mock";
import { UserServiceMock } from "../testing/user-service-mocks";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userCreateDTOMock } from "../testing/user-create-dto.mock";
import { ListUserEntity } from "../testing/user-entity-list.mock";
import { UserUpdatePutDTOMock } from "../testing/user-update-put.mock";
import { UserUpdatePathDTOMock } from "../testing/user-update-path.mock";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test("validação de definição ", () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });

  describe("create", () => {
    test("method create", async () => {
      const results = await userController.create(userCreateDTOMock);
      expect(results).toEqual(ListUserEntity[0]);
    });
  });

  describe("get", () => {
    test("method findAll", async () => {
      const results = await userController.findAll();
      expect(results).toEqual(ListUserEntity);
    });
    test("method findAll", async () => {
      const results = await userController.findOne(1);
      expect(results).toEqual(ListUserEntity[0]);
    });
  });

  describe("update", () => {
    test("method update", async () => {
      const results = await userController.update(1, UserUpdatePutDTOMock);
      expect(results).toEqual(ListUserEntity[0]);
    });
    test("method updatePartial", async () => {
      const results = await userController.updatePartial(
        1,
        UserUpdatePathDTOMock
      );
      expect(results).toEqual(ListUserEntity[0]);
    });
  });

  describe("delete", () => {
    test("method delete", async () => {
      const results = await userController.delete(1);
      expect(results).toEqual(true);
    });
  });
});
