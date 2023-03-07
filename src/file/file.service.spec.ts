import { Test, TestingModule } from "@nestjs/testing";
import { getPhoto } from "../testing/get-foto.mock";
import { FileService } from "./file.service";

describe("fileServe", () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test("validar definição ", () => {
    expect(fileService).toBeDefined();
  });

  describe("teste do file service", () => {
    test("method upload", async () => {
      const photo = await getPhoto();
      await fileService.upload(photo, "Photo-test.jpeg");
    });
  });
});
