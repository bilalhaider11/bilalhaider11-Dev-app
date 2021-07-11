import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') private userModel: Model<User>)
    {    
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'somesupersecret',
        })
    }

    async validate(payload: JwtPayload) : Promise<User> {
        const {email} = payload;
        const user = await this.userModel.findOne({email}).select('-password');
        
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}