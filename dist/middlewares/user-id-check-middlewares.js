"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdCheckMiddleware = void 0;
const common_1 = require("@nestjs/common");
class UserIdCheckMiddleware {
    use(req, res, next) {
        console.log(`UserIdCheckMiddleware`, "antes");
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new common_1.BadRequestException("ID invalido!");
        }
        console.log(`UserIdCheckMiddleware`, "depois");
        next();
    }
}
exports.UserIdCheckMiddleware = UserIdCheckMiddleware;
//# sourceMappingURL=user-id-check-middlewares.js.map