import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: 'Please enter a valid email'})
    email: string;

    @IsNotEmpty()
    password: string;
}