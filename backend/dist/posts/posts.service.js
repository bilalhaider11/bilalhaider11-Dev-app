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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../schemas/post.schema");
const user_schema_1 = require("../schemas/user.schema");
let PostsService = class PostsService {
    constructor(postModel, userModel, likeModel, commentModel) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.likeModel = likeModel;
        this.commentModel = commentModel;
    }
    async createPost(createPostDto, user) {
        const { text } = createPostDto;
        const userRecord = await this.userModel.findById(user).select('-password');
        const post = new this.postModel({
            text: text,
            name: userRecord.name,
            avatar: userRecord.avatar,
            user: user
        });
        await post.save();
        return post;
    }
    ;
    async getAllPosts() {
        const posts = await this.postModel.find().sort({ date: -1 });
        return posts;
    }
    async getPostById(id) {
        try {
            const post = await this.postModel.findById(id);
            if (!post) {
                throw new common_1.NotFoundException({ message: 'Post not found!' });
            }
            return post;
        }
        catch (error) {
            throw new common_1.NotFoundException({ message: 'Post not found!' });
        }
    }
    ;
    async deletePost(id, user) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException({ message: 'Post not found!' });
        }
        if (post.user.toString() !== user.id.toString()) {
            throw new common_1.UnauthorizedException({ message: 'user not authenticated!' });
        }
        ;
        await post.remove();
    }
    ;
    async likePost(id, userData) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException({ msg: 'Post not found!' });
        }
        if (post.likes.filter(like => like.user.toString() === userData.id.toString()).length > 0) {
            throw new common_1.ConflictException({ msg: 'post already liked!' });
        }
        ;
        const newLike = new this.likeModel({ user: userData.id });
        post.likes.unshift(newLike);
        await post.save();
        return post.likes;
    }
    ;
    async unlikePost(id, user) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException({ msg: 'Post not found!' });
        }
        if (post.likes.filter(like => like.user.toString() === user.id.toString()).length === 0) {
            throw new common_1.NotFoundException({ msg: 'post has not yet been liked!' });
        }
        ;
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(user.toString());
        post.likes.splice(removeIndex, 1);
        await post.save();
        return post.likes;
    }
    async commentPost(createCommentDto, id, user) {
        const { text } = createCommentDto;
        const userData = await this.userModel.findById(user.id).select('-password');
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException({ msg: 'Post not found!' });
        }
        ;
        const newComment = new this.commentModel({
            user: user.id,
            text: text,
            name: userData.name,
            avatar: userData.avatar
        });
        post.comments.unshift(newComment);
        await post.save();
        return post.comments;
    }
    async uncomment(id, commentId, user) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException({ msg: 'Post not found!' });
        }
        ;
        const comment = post.comments.find(comment => comment.id.toString() === commentId.toString());
        if (!comment) {
            throw new common_1.NotFoundException({ msg: 'Comment does not exist' });
        }
        if (comment.user.toString() !== user.id.toString()) {
            throw new common_1.UnauthorizedException({ msg: 'user not authorized!' });
        }
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(user.id.toString());
        post.comments.splice(removeIndex, 1);
        await post.save();
        return post.comments;
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Posts')),
    __param(1, mongoose_1.InjectModel('User')),
    __param(2, mongoose_1.InjectModel('Like')),
    __param(3, mongoose_1.InjectModel('Comment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
;
//# sourceMappingURL=posts.service.js.map