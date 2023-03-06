import { Test, TestingModule } from "@nestjs/testing";
import { Role } from "../enums/role.enum";
import { userCreateDTOMock } from "../testing/user-create-dto.mock";
import { UserUpdatePutDTOMock } from "../testing/user-update-put.mock";
import { ListUserEntity } from "../testing/user-entity-list.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  test("validar a definição ", () => {
    expect(userService).toBeDefined();
  });

  describe("Create", () => {
    test("metho create", async () => {
      const result = await userService.create(userCreateDTOMock);

      expect(result).toEqual(ListUserEntity[0]);
    });
  });
  describe("find", () => {
    test("method list", async () => {
      const result = await userService.findAll();
      expect(result).toEqual(ListUserEntity);
    });
    test("method findOne", async () => {
      const result = await userService.findOne(1);
      expect(result).toEqual(ListUserEntity[0]);
    });
  });
  describe("update", () => {
    test("method update", async () => {
      const result = await userService.update(1, UserUpdatePutDTOMock);
      expect(result).toEqual(ListUserEntity[0]);
    });

    test(" method update partial", async () => {
      const result = await userService.findOne(1);
      expect(result).toEqual(ListUserEntity[0]);
    });
  });
});
