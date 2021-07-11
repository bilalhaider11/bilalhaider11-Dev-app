import {Model} from 'mongoose';
import {  ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ){}

    async createTask(
        createUserDto: CreateUserDto,
    ) : Promise<string> {
        const {name, email, password } = createUserDto;
        
        let user = await this.userModel.findOne({email});

        if(user) {
            throw new ConflictException({message: 'user already exists!'});
        };
        
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new this.userModel({
            name,
            email,
            avatar,
            password,
        });

        const salt = await bcrypt.genSalt(12);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload: JwtPayload = {email};
        const accessToken = await this.jwtService.sign(payload);
        return accessToken;
        // return user;
    }
};
