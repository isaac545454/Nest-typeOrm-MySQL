import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDTO): Promise<import("./entity/user.entity").UserEntity>;
    findAll(): Promise<import("./entity/user.entity").UserEntity[]>;
    findOne(id: number): Promise<import("./entity/user.entity").UserEntity>;
    update(id: number, data: UpdateUserDTO): Promise<import("typeorm").UpdateResult>;
    updatePartial(id: number, Body: PathUserDTO): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
