import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/User/user.service";
import { AuhtService } from "../auth/auth.service";
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuhtService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
