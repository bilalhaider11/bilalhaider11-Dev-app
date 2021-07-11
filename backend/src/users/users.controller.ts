import { Body, ValidationPipe } from '@nestjs/common';
import { Controller, Post, UsePipes } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersServics: UsersService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    createUser(
        @Body() createUserDto: CreateUserDto,
    ) : Promise<String> {
        return this.usersServics.createTask(createUserDto);
    }
};
