"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsId = void 0;
const common_1 = require("@nestjs/common");
exports.paramsId = (0, common_1.createParamDecorator)((_data, context) => {
    return Number(context.switchToHttp().getRequest().params.id);
});
//# sourceMappingURL=params-id-decorators.js.map