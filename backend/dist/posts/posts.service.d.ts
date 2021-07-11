import { Model } from 'mongoose';
import { Comment, Like, Posts } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import * as mongoose from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class PostsService {
    private postModel;
    private userModel;
    private likeModel;
    private commentModel;
    constructor(postModel: Model<Posts>, userModel: Model<User>, likeModel: Model<Like>, commentModel: Model<Comment>);
    createPost(createPostDto: CreatePostDto, user: User): Promise<Posts>;
    getAllPosts(): Promise<Posts[]>;
    getPostById(id: mongoose.ObjectId): Promise<Posts>;
    deletePost(id: mongoose.ObjectId, user: User): Promise<void>;
    likePost(id: mongoose.ObjectId, userData: User): Promise<Object[]>;
    unlikePost(id: String, user: User): Promise<Object[]>;
    commentPost(createCommentDto: CreateCommentDto, id: String, user: User): Promise<Object[]>;
    uncomment(id: mongoose.ObjectId, commentId: mongoose.Types.ObjectId, user: User): Promise<Object[]>;
}
