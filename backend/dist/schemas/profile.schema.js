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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = exports.Profile = exports.Social = exports.Education = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
class Education {
}
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Education.prototype, "school", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Education.prototype, "degree", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Education.prototype, "fieldofstudy", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Education.prototype, "from", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", Date)
], Education.prototype, "to", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Education.prototype, "current", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Education.prototype, "description", void 0);
exports.Education = Education;
let Social = class Social {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Social.prototype, "youtube", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Social.prototype, "twitter", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Social.prototype, "facebook", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Social.prototype, "linkedin", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Social.prototype, "instagram", void 0);
Social = __decorate([
    mongoose_1.Schema()
], Social);
exports.Social = Social;
let Profile = class Profile {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, default: undefined }),
    __metadata("design:type", Object)
], Profile.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Profile.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Profile.prototype, "company", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Profile.prototype, "website", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Profile.prototype, "locations", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Profile.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Profile.prototype, "skills", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Profile.prototype, "githubusername", void 0);
__decorate([
    mongoose_1.Prop({ type: [Object],
        title: { required: true },
        company: { required: true },
        from: { required: true },
        current: { default: false },
        to: { default: null }
    }),
    __metadata("design:type", Array)
], Profile.prototype, "experience", void 0);
__decorate([
    mongoose_1.Prop({ type: [Object] }),
    __metadata("design:type", Array)
], Profile.prototype, "education", void 0);
__decorate([
    mongoose_1.Prop({ type: Social }),
    __metadata("design:type", Social)
], Profile.prototype, "social", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Profile.prototype, "date", void 0);
Profile = __decorate([
    mongoose_1.Schema()
], Profile);
exports.Profile = Profile;
exports.ProfileSchema = mongoose_1.SchemaFactory.createForClass(Profile);
//# sourceMappingURL=profile.schema.js.map