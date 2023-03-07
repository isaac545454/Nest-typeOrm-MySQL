import { createReadStream, ReadStream } from "fs";

export const getToBuffet = (fileName: string) => {
  const readStream = createReadStream(fileName);
  const chunks = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on("data", (chunk) => chunks.push(chunk));

      readStream.on("error", (err) => reject(err));

      readStream.on("close", () => {
        resolve({
          buffer: Buffer.concat(chunks) as Buffer,
          stream: readStream,
        });
      });
    }
  );
};
