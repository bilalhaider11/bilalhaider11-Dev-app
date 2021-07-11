import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail({}, {message: 'Please enter a valid email'})
    email: string;

    @MinLength(6, {message: 'Please enter a password with 6 or more characters'})
    password: string;

}