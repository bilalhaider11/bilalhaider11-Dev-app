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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const profile_schema_1 = require("../schemas/profile.schema");
const user_schema_1 = require("../schemas/user.schema");
const create_profile_dto_1 = require("./dto/create-profile.dto");
const education_dto_1 = require("./dto/education.dto");
const experience_dto_1 = require("./dto/experience.dto");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    myProfile(user) {
        return this.profileService.myProfile(user);
    }
    ;
    createProfile(user, createProfileDto) {
        return this.profileService.createProfile(createProfileDto, user);
    }
    ;
    getAllProfiles() {
        return this.profileService.getAllProfiles();
    }
    ;
    getProfileById(param) {
        return this.profileService.getProfileById(param.user_id);
    }
    ;
    deletePost(user) {
        return this.profileService.deleteProfile(user);
    }
    addExperience(expDto, user) {
        return this.profileService.addExperience(expDto, user);
    }
    ;
    deleteExperience(param, user) {
        return this.profileService.deleteExperience(param.index, user);
    }
    ;
    addEducation(expDto, user) {
        return this.profileService.addEducation(expDto, user);
    }
    ;
    deleteEducation(param, user) {
        return this.profileService.deleteEducation(param.index, user);
    }
    ;
    getGithubRepos(params) {
        return this.profileService.getGithubRepo(params.username);
    }
};
__decorate([
    common_1.Get('/me'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "myProfile", null);
__decorate([
    common_1.Post('/'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_profile_dto_1.CreateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createProfile", null);
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAllProfiles", null);
__decorate([
    common_1.Get('/user/:user_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfileById", null);
__decorate([
    common_1.Delete('/'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deletePost", null);
__decorate([
    common_1.Put('/experience'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [experience_dto_1.ExperienceDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addExperience", null);
__decorate([
    common_1.Delete('/experience/:index'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteExperience", null);
__decorate([
    common_1.Put('/education'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [education_dto_1.EducationDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addEducation", null);
__decorate([
    common_1.Delete('/education/:index'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteEducation", null);
__decorate([
    common_1.Get('/github/:username'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getGithubRepos", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map