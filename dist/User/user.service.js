"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const brypt = require("bcrypt");
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async create({ email, name, password, role }) {
    if (
      await this.userRepository.exist({
        where: {
          email: email,
        },
      })
    ) {
      throw new common_1.BadRequestException(
        "Este e-mail já está sendo usado."
      );
    }
    const salt = await brypt.genSalt();
    password = await brypt.hash(password, salt);
    try {
      return this.userRepository.create({
        email,
        name,
        password,
        role,
      });
    } catch (error) {
      console.log(" error" + " " + error);
    }
  }
  async update(id, { birthAt, name, email, password, role }) {
    await this.exists(id);
    const salt = await brypt.genSalt();
    password = await brypt.hash(password, salt);
    return this.userRepository.update(id, {
      email,
      password,
      name,
      role,
      birthAt: birthAt ? String(new Date(birthAt)) : null,
    });
  }
  async updatePartial(id, { birthAt, name, email, password, role }) {
    await this.exists(id);
    const data = {};
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.birthAt = name;
    }
    if (email) {
      data.birthAt = email;
    }
    if (password) {
      const salt = await brypt.genSalt();
      password = await brypt.hash(password, salt);
      data.birthAt = password;
    }
    if (role) {
      data.birthAt = role;
    }
    return this.userRepository.update(id, {
      email,
      password,
      name,
      birthAt: birthAt ? String(new Date(birthAt)) : null,
    });
  }
  async findAll() {
    return this.userRepository.find();
  }
  async findOne(id) {
    await this.exists(id);
    return this.userRepository.findOneBy({
      id,
    });
  }
  async delete(id) {
    await this.exists(id);
    return this.userRepository.delete(id);
  }
  async exists(id) {
    if (
      !(await this.userRepository.count({
        where: {
          id,
        },
      }))
    ) {
      throw new common_1.NotFoundException("o usuario não existe");
    }
  }
};
UserService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository]),
  ],
  UserService
);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
