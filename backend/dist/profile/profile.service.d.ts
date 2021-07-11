import * as mongoose from 'mongoose';
import { Posts } from 'src/schemas/post.schema';
import { Profile, ProfileDocument } from 'src/schemas/profile.schema';
import { User } from 'src/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
export declare class ProfileService {
    private profileModel;
    private userModel;
    private postModel;
    constructor(profileModel: mongoose.Model<ProfileDocument>, userModel: mongoose.Model<User>, postModel: mongoose.Model<Posts>);
    myProfile(user: User): Promise<Profile>;
    createProfile(createProfileDto: CreateProfileDto, userData: User): Promise<Profile>;
    getAllProfiles(): Promise<Profile[]>;
    getProfileById(user_id: mongoose.ObjectId): Promise<Profile>;
    deleteProfile(user: User): Promise<void>;
    addExperience(expDto: ExperienceDto, user: User): Promise<Profile>;
    deleteExperience(removeIndex: number, user: User): Promise<Profile>;
    addEducation(eduDto: EducationDto, user: User): Promise<Profile>;
    deleteEducation(removeIndex: number, user: User): Promise<Profile>;
    getGithubRepo(username: String): Promise<String[]>;
}
