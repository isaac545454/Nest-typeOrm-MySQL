import { Test, TestingModule } from "@nestjs/testing";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { users } from "./entity/user.entity";
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
});
