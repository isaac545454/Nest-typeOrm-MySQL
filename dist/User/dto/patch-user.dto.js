"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathUserDTO = void 0;
const create_user_dto_1 = require("./create-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class PathUserDTO extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDTO) {
}
exports.PathUserDTO = PathUserDTO;
//# sourceMappingURL=patch-user.dto.js.map