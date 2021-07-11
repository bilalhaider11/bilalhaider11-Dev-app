"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const post_schema_1 = require("../schemas/post.schema");
const profile_schema_1 = require("../schemas/profile.schema");
const user_schema_1 = require("../schemas/user.schema");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./profile.service");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: profile_schema_1.Profile.name, schema: profile_schema_1.ProfileSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Post', schema: post_schema_1.PostSchema }]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'somesupersecret',
                signOptions: {
                    expiresIn: 36000,
                },
            }),
        ],
        controllers: [profile_controller_1.ProfileController],
        providers: [
            profile_service_1.ProfileService,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule
        ]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map