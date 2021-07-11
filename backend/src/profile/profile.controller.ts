import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Profile } from 'src/schemas/profile.schema';
import { User } from 'src/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService){}

    @Get('/me')
    @UseGuards(AuthGuard())
    myProfile(@GetUser() user: User) : Promise<Profile>{
        return this.profileService.myProfile(user);
    };

    @Post('/')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createProfile(
        @GetUser() user: User,
        @Body() createProfileDto: CreateProfileDto,
    ) : Promise<Profile>{

        return this.profileService.createProfile(createProfileDto, user);
    };

    @Get('/')
    getAllProfiles() : Promise<Profile[]> {
        return this.profileService.getAllProfiles();
    };

    @Get('/user/:user_id')
    getProfileById(@Param() param) : Promise<Profile> {
        return this.profileService.getProfileById(param.user_id);
    };

    @Delete('/')
    @UseGuards(AuthGuard())
    deletePost(@GetUser() user: User) : Promise<void> {
        return this.profileService.deleteProfile(user);
    }

    @Put('/experience')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addExperience(
        @Body() expDto: ExperienceDto,
        @GetUser() user: User,
    ) : Promise<Profile> {
        return this.profileService.addExperience(expDto, user);
    };

    @Delete('/experience/:index')
    @UseGuards(AuthGuard())
    deleteExperience(
        @Param() param,
        @GetUser() user: User,
    ) : Promise<Profile> {
        
        return this.profileService.deleteExperience(param.index, user);
    };

    @Put('/education')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addEducation(
        @Body() expDto: EducationDto,
        @GetUser() user: User,
    ) : Promise<Profile> {
        return this.profileService.addEducation(expDto, user);
    };

    @Delete('/education/:index')
    @UseGuards(AuthGuard())
    deleteEducation(
        @Param() param,
        @GetUser() user: User,
    ) : Promise<Profile> {
        return this.profileService.deleteEducation(param.index, user);
    };

    @Get('/github/:username')
    getGithubRepos(
        @Param() params
    ) : Promise<String[]>{
        return this.profileService.getGithubRepo(params.username);
    }
}
