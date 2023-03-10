import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as brypt from "bcrypt";
import { users } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>
  ) {}

  async create({ email, name, password, role }: CreateUserDTO) {
    if (
      await this.userRepository.exist({
        where: {
          email: email,
        },
      })
    ) {
      throw new BadRequestException("Este e-mail já está sendo usado.");
    }

    const salt = await brypt.genSalt();

    password = await brypt.hash(password, salt);

    try {
      return this.userRepository.save({
        email,
        name,
        password,
        role,
      });
    } catch (error) {
      console.log(" error" + " " + error);
    }
  }

  async update(
    id: number,
    { birthAt, name, email, password, role }: UpdateUserDTO
  ) {
    await this.exists(id);

    const salt = await brypt.genSalt();

    password = await brypt.hash(password, salt);
    try {
      await this.userRepository.update(id, {
        email,
        password,
        name,
        role,
        birthAt: birthAt ? String(new Date(birthAt)) : null,
      });

      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException("houve um erro");
    }
  }

  async updatePartial(
    id: number,
    { birthAt, name, email, password, role }: PathUserDTO
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      const salt = await brypt.genSalt();

      password = await brypt.hash(password, salt);
      data.password = password;
    }
    if (role) {
      data.role = role;
    }
    try {
      await this.userRepository.update(id, {
        email,
        password,
        name,
        birthAt: birthAt ? String(new Date(birthAt)) : null,
      });
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException("houve um erro");
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.userRepository.findOneBy({
      id,
    });
  }

  async delete(id: number) {
    await this.exists(id);
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      throw new BadRequestException("houve um erro");
    }
  }

  async exists(id: number) {
    if (
      !(await this.userRepository.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException("o usuario não existe");
    }
  }
}
