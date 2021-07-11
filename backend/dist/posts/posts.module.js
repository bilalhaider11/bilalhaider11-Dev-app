"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const user_schema_1 = require("../schemas/user.schema");
const post_schema_1 = require("../schemas/post.schema");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Posts', schema: post_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Like', schema: post_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Comment', schema: post_schema_1.PostSchema }]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'somesupersecret',
                signOptions: {
                    expiresIn: 36000,
                },
            }),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [
            posts_service_1.PostsService,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
        ],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map