import { Test, TestingModule } from "@nestjs/testing";

import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    userService = module.get<UserService>(UserService);
  });
  test("Validar definição", () => {
    expect(userService).toBeDefined();
  });
});
