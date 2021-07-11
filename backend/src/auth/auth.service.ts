import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ){}

    async getUser(user: User) : Promise<User> {
        const userRecord = await this.userModel.findOne(user).select('-password');
        return userRecord;
    }
 
    async login(loginDto: LoginDto) : Promise<String> {
        const {email, password} = loginDto;

        let user = await this.userModel.findOne({email});

        if(!user) {
            throw new NotFoundException({message: 'User does not exist!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new NotFoundException({message: 'Invalid Password!'});
        };

        const payload: JwtPayload = {email};
        const accessToken = await this.jwtService.sign(payload);

        return accessToken;
    }
}1
