import { AuthResetDTO } from "../auth/dto/auth-reset-dto";
import { resetToken } from "./reset-token.mock";

export const authResettDTOMOCK: AuthResetDTO = {
  password: "Teste@04",
  token: resetToken,
};
