import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthRegisterDTO } from "./dto/auth-register-dto";
import * as brypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { users } from "../User/entity/user.entity";
import { UserService } from "../User/user.service";

@Injectable()
export class AuhtService {
  private audience = "user";
  private issuer = "login";
  constructor(
    private readonly jwtservice: JwtService,
    @InjectRepository(users)
    private userRepository: Repository<users>,
    private readonly userService: UserService,
    private readonly mailer: MailerService
  ) {}

  createToken(user: users) {
    return {
      acessToken: this.jwtservice.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        }
      ),
    };
  }
  checkToken(token: string) {
    try {
      const data = this.jwtservice.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidation(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    console.log("email" + user);

    if (!user) throw new UnauthorizedException("Email ou senha incorretos.");

    if (!(await brypt.compare(password, user.password))) {
      throw new UnauthorizedException("Email ou senha incorretos.");
    }
    return this.createToken(user);
  }
  async forget(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException("Email incorretos.");

    const token = this.jwtservice.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "30 minutes",
        subject: String(user.id),
        issuer: "forget",
        audience: this.audience,
      }
    );
    await this.mailer.sendMail({
      subject: "Recuperação de senha",
      to: "isaac@dev.com.br",
      template: "forget",
      context: {
        name: user.name,
        token,
      },
    });

    return true;
  }
  async reset(password: string, token: string) {
    try {
      const { id: idToken } = this.jwtservice.verify(token, {
        issuer: "forget",
        audience: this.audience,
      });

      if (isNaN(Number(idToken))) {
        throw new BadRequestException("Token invalido");
      }

      const salt = await brypt.genSalt();
      password = await brypt.hash(password, salt);

      await this.userRepository.update(Number(idToken), {
        password,
      });

      const user = await this.userService.findOne(Number(idToken));
      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
    //TODO:token valido?
  }

  async register(data: AuthRegisterDTO) {
    console.log("password" + data.password);
    const user = await this.userService.create(data);
    return this.createToken(user as users);
  }
}
