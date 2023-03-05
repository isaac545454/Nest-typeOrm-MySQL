"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("./user.service");
describe("UserService", () => {
    let userService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_service_1.UserService],
        }).compile();
        userService = module.get(user_service_1.UserService);
    });
    test("Validar definição", () => {
        expect(userService).toBeDefined();
    });
});
//# sourceMappingURL=user.service.spex.js.map