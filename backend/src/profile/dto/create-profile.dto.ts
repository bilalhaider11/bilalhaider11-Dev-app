import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    status: String;

    @IsNotEmpty()
    skills: String[];

    company: String;

    website: String;

    location: String;

    bio: String;

    githubusername: String;

    experience: Object[];

    education: Object[];

    facebook: String;

    youtube: String;

    instagram: String;

    linkedin: String;

    twitter: String;
};