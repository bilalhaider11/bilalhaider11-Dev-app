import { Profile } from 'src/schemas/profile.schema';
import { User } from 'src/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    myProfile(user: User): Promise<Profile>;
    createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile>;
    getAllProfiles(): Promise<Profile[]>;
    getProfileById(param: any): Promise<Profile>;
    deletePost(user: User): Promise<void>;
    addExperience(expDto: ExperienceDto, user: User): Promise<Profile>;
    deleteExperience(param: any, user: User): Promise<Profile>;
    addEducation(expDto: EducationDto, user: User): Promise<Profile>;
    deleteEducation(param: any, user: User): Promise<Profile>;
    getGithubRepos(params: any): Promise<String[]>;
}
