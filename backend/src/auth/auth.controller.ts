import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get()
    @UseGuards(AuthGuard())
    getUser(@GetUser() user: User) : Promise<User> {
        return this.authService.getUser(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: LoginDto) : Promise<String> {
        return this.authService.login(loginDto);
    }
}
