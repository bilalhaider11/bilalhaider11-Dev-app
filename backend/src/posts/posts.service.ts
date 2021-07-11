import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, Like, Posts } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import * as mongoose from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Posts') private postModel: Model<Posts>,
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Like') private likeModel: Model<Like>,
        @InjectModel('Comment') private commentModel: Model<Comment>,
    ){}

    async createPost(
        createPostDto: CreatePostDto,
        user: User,
        ): Promise<Posts>{
        const {text} = createPostDto;

        const userRecord = await this.userModel.findById(user).select('-password');
        const post = new this.postModel({
            text: text,
            name: userRecord.name,
            avatar: userRecord.avatar,
            user: user
        });

        await post.save();

        return post;
    };


    async getAllPosts() : Promise<Posts[]> {
        const posts: Posts[] = await this.postModel.find().sort({date: -1});
        return posts;
    }

    async getPostById(id: mongoose.ObjectId) : Promise<Posts> {
        try{
            const post = await this.postModel.findById(id);

            if(!post) {
                throw new NotFoundException({message: 'Post not found!'});
            }

            return post;
        }
        catch(error) {
            throw new NotFoundException({message: 'Post not found!'});
        }   
    };

    async deletePost(id: mongoose.ObjectId, user: User) : Promise<void> {
        
        // try{
            const post = await this.postModel.findById(id);
            if(!post) {
                throw new NotFoundException({message: 'Post not found!'});
            }
            
            if(post.user.toString() !== user.id.toString()) {
                throw new UnauthorizedException({message: 'user not authenticated!'});
            };
            
            await post.remove();
        // }
        // catch(error) {
        //     throw new NotFoundException({message: 'Post not found!'});
        // } 
    };


    async likePost(id: mongoose.ObjectId, userData: User) : Promise<Object[]> {
        // try {

            const post = await this.postModel.findById(id);

            if(!post) {
                throw new NotFoundException({msg: 'Post not found!'});
            }
            
            if(post.likes.filter(like => like.user.toString() === userData.id.toString()).length > 0) {
                throw new ConflictException({msg: 'post already liked!'});
            };

            
            const newLike = new this.likeModel({user: userData.id});

            post.likes.unshift(newLike);

            await post.save();
            
            return post.likes;
        // } 
        // catch (error) {
        //     if(error.kind === 'ObjectId') {
        //         throw new NotFoundException({msg: 'Post not found!'})
        //     }    
        //     else {
        //         throw new InternalServerErrorException();
        //     }
        // }
    };

    async unlikePost(id: String, user: User) : Promise<Object[]> {
            
        const post = await this.postModel.findById(id);
        if(!post) {
            throw new NotFoundException({msg: 'Post not found!'});
        }
        
        if(post.likes.filter(like => like.user.toString() === user.id.toString()).length === 0)   {
            throw new NotFoundException({msg: 'post has not yet been liked!'});
        };


        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(user.toString());
        
        post.likes.splice(removeIndex, 1);

        await post.save();

        return post.likes;
    }

    async commentPost(createCommentDto: CreateCommentDto ,id: String, user: User) : Promise<Object[]>{

        const {text} = createCommentDto;

        const userData = await this.userModel.findById(user.id).select('-password');
        
        const post = await this.postModel.findById(id);
        if(!post) {
            throw new NotFoundException({msg: 'Post not found!'});
        };

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

    async uncomment(id: mongoose.ObjectId, commentId: mongoose.Types.ObjectId, user: User) : Promise<Object[]> {
        const post = await this.postModel.findById(id);
        if(!post) {
            throw new NotFoundException({msg: 'Post not found!'});
        };
        
        //pull out comment
        const comment = post.comments.find(comment => comment.id.toString() === commentId.toString());
        
        //Make sure comment exists
        if(!comment) {
            throw new NotFoundException({msg: 'Comment does not exist'});
        }

        // // check user

        if(comment.user.toString() !== user.id.toString()) {
            throw new UnauthorizedException({msg: 'user not authorized!'});
        }   

        //Get remove index
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(user.id.toString());
        
        post.comments.splice(removeIndex, 1);
 
        await post.save();

        return post.comments;
    }
}; 
