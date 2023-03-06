import { Test, TestingModule } from "@nestjs/testing";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { AuhtService } from "./auth.service";

describe("authService", () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuhtService, userRepositoryMock],
    }).compile();
  });
});
