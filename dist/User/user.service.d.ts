import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create({ email, name, password, role }: CreateUserDTO): Promise<UserEntity>;
    update(id: number, { birthAt, name, email, password, role }: UpdateUserDTO): Promise<import("typeorm").UpdateResult>;
    updatePartial(id: number, { birthAt, name, email, password, role }: PathUserDTO): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    exists(id: number): Promise<void>;
}
