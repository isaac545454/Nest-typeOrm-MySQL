"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const params_id_decorators_1 = require("../decorators/params-id-decorators");
const role_decorators_1 = require("../decorators/role-decorators");
const role_enum_1 = require("../enums/role.enum");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
const log_interceptor_1 = require("../interceptors/log.interceptor");
const create_user_dto_1 = require("./dto/create-user.dto");
const patch_user_dto_1 = require("./dto/patch-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(data) {
        return this.userService.create(data);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findOne(id) {
        return this.userService.findOne(id);
    }
    async update(id, data) {
        return this.userService.update(id, data);
    }
    async updatePartial(id, Body) {
        return this.userService.updatePartial(id, Body);
    }
    async delete(id) {
        return this.userService.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, params_id_decorators_1.paramsId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, params_id_decorators_1.paramsId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, params_id_decorators_1.paramsId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_user_dto_1.PathUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePartial", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, params_id_decorators_1.paramsId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    (0, role_decorators_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map