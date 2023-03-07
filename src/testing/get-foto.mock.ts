import { join } from "path";
import { getToBuffet } from "./file-to-buffer";

export const getPhoto = async () => {
  const { buffer, stream } = await getToBuffet(join(__dirname, "photo.jpeg"));

  const photo: Express.Multer.File = {
    fieldname: "file",
    originalname: "foto",
    buffer: buffer,
    size: 2000,
    stream: stream,
    destination: "",
    filename: "photoTest",
    path: "file-path",
    mimetype: "image/jpeg",
    encoding: "7bit",
  };

  return photo;
};
