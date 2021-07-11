"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const experience_schema_1 = require("../schemas/experience.schema");
const post_schema_1 = require("../schemas/post.schema");
const profile_schema_1 = require("../schemas/profile.schema");
const user_schema_1 = require("../schemas/user.schema");
const cross_fetch_1 = require("cross-fetch");
let ProfileService = class ProfileService {
    constructor(profileModel, userModel, postModel) {
        this.profileModel = profileModel;
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async myProfile(user) {
        const profile = await this.profileModel.findOne({ user: user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            throw new common_1.NotFoundException({ message: 'There is no profile for this user!' });
        }
        ;
        return profile;
    }
    ;
    async createProfile(createProfileDto, userData) {
        const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, linkedin, instagram, } = createProfileDto;
        const profileFields = new this.profileModel();
        profileFields.user = userData.id;
        if (company)
            profileFields.company = company;
        if (website)
            profileFields.website = website;
        if (location)
            profileFields.locations = location;
        if (bio)
            profileFields.bio = bio;
        if (status)
            profileFields.status = status;
        if (githubusername)
            profileFields.githubusername = githubusername;
        const social = new profile_schema_1.Social();
        if (youtube)
            social.youtube = youtube;
        if (twitter)
            social.twitter = twitter;
        if (facebook)
            social.facebook = facebook;
        if (linkedin)
            social.linkedin = linkedin;
        if (instagram)
            social.instagram = instagram;
        if (Object.keys(social).length > 0)
            profileFields.social = social;
        if (skills) {
            profileFields.skills = skills.toString().split(',').map(skill => skill.trim());
        }
        ;
        let profile = await this.profileModel.findOne({ user: userData.id });
        if (profile) {
            if (company)
                profile.company = company;
            if (website)
                profile.website = website;
            if (location)
                profile.locations = location;
            if (bio)
                profile.bio = bio;
            if (status)
                profile.status = status;
            if (githubusername)
                profile.githubusername = githubusername;
            const social = new profile_schema_1.Social();
            if (youtube)
                social.youtube = youtube;
            if (twitter)
                social.twitter = twitter;
            if (facebook)
                social.facebook = facebook;
            if (linkedin)
                social.linkedin = linkedin;
            if (instagram)
                social.instagram = instagram;
            if (Object.keys(social).length > 0)
                profile.social = social;
            if (skills) {
                profile.skills = skills.toString().split(',').map(skill => skill.trim());
            }
            ;
            await profile.save();
            return profile;
        }
        profile = new this.profileModel(profileFields);
        await profile.save();
        return profile;
    }
    ;
    async getAllProfiles() {
        const profiles = await this.profileModel.find().populate('user', ['name', 'avatar']);
        return profiles;
    }
    async getProfileById(user_id) {
        const profile = await this.profileModel.findOne({ user: user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            throw new common_1.NotFoundException({ message: 'Profile not found!' });
        }
        return profile;
    }
    ;
    async deleteProfile(user) {
        await this.postModel.deleteMany({ user: user.id });
        await this.profileModel.findOneAndRemove({ user: user.id });
        await this.userModel.findOneAndRemove({ _id: user.id });
    }
    ;
    async addExperience(expDto, user) {
        const { title, company, location, from, to, current, description } = expDto;
        const newExp = new experience_schema_1.Experience();
        newExp.title = title;
        newExp.company = company;
        newExp.location = location;
        newExp.from = from;
        newExp.to = to;
        newExp.current = current;
        newExp.description = description;
        const profile = await this.profileModel.findOne({ user: user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return profile;
    }
    ;
    async deleteExperience(removeIndex, user) {
        const profile = await this.profileModel.findOne({ user: user.id });
        profile.experience.splice(removeIndex, 1);
        const abc = await profile.save();
        return profile;
    }
    async addEducation(eduDto, user) {
        const { school, degree, fieldofstudy, from, to, current, description } = eduDto;
        const newEdu = new profile_schema_1.Education();
        newEdu.school = school;
        newEdu.degree = degree;
        newEdu.fieldofstudy = fieldofstudy;
        newEdu.from = from;
        newEdu.to = to;
        newEdu.current = current;
        newEdu.description = description;
        const profile = await this.profileModel.findOne({ user: user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        return profile;
    }
    ;
    async deleteEducation(removeIndex, user) {
        const profile = await this.profileModel.findOne({ user: user.id });
        profile.education.splice(removeIndex, 1);
        await profile.save();
        return profile;
    }
    async getGithubRepo(username) {
        const res = await cross_fetch_1.fetch(`//api.github.com/users/${username}`);
        if (res.status >= 400) {
            throw new common_1.InternalServerErrorException({ message: "Bad response from server" });
        }
        if (res.status === 404) {
            throw new common_1.NotFoundException({ message: 'No repository found!' });
        }
        const user = await res.json();
        const repos = { repos: user.repos_url };
        console.log(user);
        return user.repos_url;
    }
    ;
};
ProfileService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(profile_schema_1.Profile.name)),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Post')),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model, mongoose.Model])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map