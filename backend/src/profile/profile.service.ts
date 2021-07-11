import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { Education, EducationDocument } from 'src/schemas/education.schema';
import { Experience } from 'src/schemas/experience.schema';
import { Posts } from 'src/schemas/post.schema';
import {  Education, Profile, ProfileDocument, Social } from 'src/schemas/profile.schema';
import { User } from 'src/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import * as config from 'config';
import * as request from 'request';
import {fetch} from 'cross-fetch'; 
@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private profileModel: mongoose.Model<ProfileDocument>,
        @InjectModel('User') private userModel: mongoose.Model<User>,
        @InjectModel('Post') private postModel: mongoose.Model<Posts>,
        // @InjectModel(Experience.name) private expModel: mongoose.Model<ExperienceDocument>,
        // @InjectModel(Education.name) private eduModel: mongoose.Model<EducationDocument>,
    ){}

    async myProfile(user: User) : Promise<Profile> {

        const profile = await this.profileModel.findOne({user: user.id}).populate('user', 
        ['name', 'avatar']);
   
        if(!profile) {
            throw new NotFoundException({message: 'There is no profile for this user!'});
        };

        return profile;
    };

    async createProfile(createProfileDto: CreateProfileDto, userData: User) : Promise<Profile> {
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            linkedin,
            instagram,
        } = createProfileDto;

        //Build Profile fileds
        const profileFields = new this.profileModel();
        profileFields.user = userData.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.locations = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;

        //Build social object
        const social = new Social()
        if(youtube) social.youtube = youtube;
        if(twitter) social.twitter = twitter;
        if(facebook) social.facebook = facebook;
        if(linkedin) social.linkedin = linkedin;
        if(instagram) social.instagram = instagram;

        if(Object.keys(social).length > 0) profileFields.social = social;

        if(skills) {
            profileFields.skills = skills.toString().split(',').map(skill => skill.trim())
        };

        let profile = await this.profileModel.findOne({user: userData.id});
        
        if(profile) {
            if(company) profile.company = company;
            if(website) profile.website = website;
            if(location) profile.locations = location;
            if(bio) profile.bio = bio;
            if(status) profile.status = status;
            if(githubusername) profile.githubusername = githubusername;
    
            //Build social object
            const social = new Social()
            if(youtube) social.youtube = youtube;
            if(twitter) social.twitter = twitter;
            if(facebook) social.facebook = facebook;
            if(linkedin) social.linkedin = linkedin;
            if(instagram) social.instagram = instagram;
    
            if(Object.keys(social).length > 0) profile.social = social;
    
            if(skills) {
                profile.skills = skills.toString().split(',').map(skill => skill.trim())
            };

            await profile.save();
            //update
            // profile = await this.profileModel.findOneAndUpdate(
            //     {user: userData.id},
            //     {$set: profileFields},
            //     {new: true}    
            // );
            return profile;
        }

        //Create
        profile = new this.profileModel(profileFields);

        await profile.save();
        
        return profile;
    };

    async getAllProfiles() : Promise<Profile[]> {
        const profiles = await this.profileModel.find().populate('user',
            ['name', 'avatar']);
        return profiles;
    }

    async getProfileById(user_id: mongoose.ObjectId) : Promise<Profile> {
        const profile = await this.profileModel.findOne({user: user_id}).populate('user',
            ['name', 'avatar']);

        if(!profile) {
            throw new NotFoundException({message: 'Profile not found!'})
        }
        return profile;
    };

    async deleteProfile(user: User): Promise<void> {
         // Remove user posts
        await this.postModel.deleteMany({user: user.id});
        // Remove Profile
        await this.profileModel.findOneAndRemove({user: user.id});
        // Remove User
        await this.userModel.findOneAndRemove({_id: user.id});

    };

    async addExperience(expDto: ExperienceDto, user: User) : Promise<Profile> {
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description 
        } = expDto;

        const newExp = new Experience()
            newExp.title = title;
            newExp.company = company;
            newExp.location = location;
            newExp.from = from;
            newExp.to = to;
            newExp.current = current;
            newExp.description = description;
        
        const profile = await this.profileModel.findOne({user: user.id});
        
        profile.experience.unshift(newExp);
        
        await profile.save();
        
        return profile;
    };

    async deleteExperience(removeIndex: number, user: User) : Promise<Profile> {
        const profile = await this.profileModel.findOne({user: user.id});
        //Get remove index
        // const removeIndex = profile.experience
        //     .map(item => item.id)
        //     .indexOf(exp_id.toString());
        
        profile.experience.splice(removeIndex, 1);
        
        const abc = await profile.save()
        
        return profile;
    }

    async addEducation(eduDto: EducationDto, user: User) : Promise<Profile>{
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description 
        } = eduDto;

        const newEdu = new Education();
        newEdu.school = school;
        newEdu.degree = degree;
        newEdu.fieldofstudy = fieldofstudy;
        newEdu.from = from;
        newEdu.to = to;
        newEdu.current = current
        newEdu.description = description;
       

        const profile = await this.profileModel.findOne({user: user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        return profile;
    };

    async deleteEducation(removeIndex: number, user: User) : Promise<Profile>{
        const profile = await this.profileModel.findOne({user: user.id});
        
        profile.education.splice(removeIndex, 1);

        await profile.save();

        return profile;
    }

    async getGithubRepo(username: String) : Promise<String[]>  {
    //     // const options = {
    //     //     uri: `https://api.github.com/users/${username}/repos?per_page=5&
    //     //     sort=created:asc`,
    //     //     method: "GET",
    //     //     Headers: {  'User-Agent': 'node.js'}
    //     // }

    //     // let newBody;

    //     // request(options, (error, response, body) => {
    //     //     if(error) console.log(error);
    //     //     console.log(response)
    //     //     if(response.statusCode !== 200) {
    //     //         throw new NotFoundException({msg: 'No Github profile found'})
    //     //     }
    //     //     newBody = body;
            
    //     // })

    //     // return {body: newBody};
    //     const body = await fetch(`https://api.github.com/users/${username}`, {
    //             headers: {  'User-Agent': 'node.js'}
    //         })
        

    //     return {body};
          const res = await fetch(`//api.github.com/users/${username}`);
      
          if (res.status >= 400) {
            throw new InternalServerErrorException({message: "Bad response from server"});
          }

          if(res.status === 404) {
              throw new NotFoundException({message: 'No repository found!'})
          }
          
      
          const user = await res.json();
          const repos = {repos: user.repos_url}
          console.log(user)
          return user.repos_url
        
      };
    
}
