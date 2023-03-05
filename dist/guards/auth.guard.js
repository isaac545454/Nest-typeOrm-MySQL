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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../User/user.service");
const auth_service_1 = require("../auth/auth.service");
let AuthGuard = class AuthGuard {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
            const data = this.authService.checkToken((authorization !== null && authorization !== void 0 ? authorization : "").split(" ")[1]);
            request.tokenPayload = data;
            request.user = await this.userService.findOne(data.id);
            return true;
        }
        catch (t) {
            return false;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuhtService,
        user_service_1.UserService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map