"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInterceptor = void 0;
const rxjs_1 = require("rxjs");
class LogInterceptor {
    intercept(context, next) {
        const dt = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const request = context.switchToHttp().getRequest();
            console.log(`URL: ${request.url}`);
            console.log(`method: ${request.method}`);
            console.log(`execução levou ${Date.now() - dt} milisegundos`);
        }));
    }
}
exports.LogInterceptor = LogInterceptor;
//# sourceMappingURL=log.interceptor.js.map