import { FileService } from "../file/file.service";

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    upload: jest.fn(),
    getDestinationPath: jest.fn(),
  },
};
