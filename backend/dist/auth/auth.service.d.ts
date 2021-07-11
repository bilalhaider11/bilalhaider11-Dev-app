import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    getUser(user: User): Promise<User>;
    login(loginDto: LoginDto): Promise<String>;
}
