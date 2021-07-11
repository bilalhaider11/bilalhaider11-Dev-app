import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUser(user: User): Promise<User>;
    login(loginDto: LoginDto): Promise<String>;
}
