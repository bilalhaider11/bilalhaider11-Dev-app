import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersServics;
    constructor(usersServics: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<String>;
}
