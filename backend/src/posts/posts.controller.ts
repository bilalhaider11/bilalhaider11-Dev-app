import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Posts } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import * as mongoose from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService){}

    @Post('/')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createPost(
        @Body() createPostDto: CreatePostDto,
        @GetUser() user: User,
        ):Promise<Posts>{
        return this.postService.createPost(createPostDto, user);
    };

    @Get('/')
    @UseGuards(AuthGuard())
    getAllPosts() : Promise<Posts[]> {
        return this.postService.getAllPosts();
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getPostById(@Param() params) : Promise<Posts> {
        return this.postService.getPostById(params.id);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deletePost(
        @Param() param,
        @GetUser() user: User
    ) : Promise<void>{
        return this.postService.deletePost(param.id, user);
    };

    @Put('/like/:id')
    @UseGuards(AuthGuard())
    likePost(
        @Param() param,
        @GetUser() user: User,    
    ) : Promise<Object[]>{
        return this.postService.likePost(param.id, user);
    };

    @Put('/unlike/:id')
    @UseGuards(AuthGuard())
    unlikePost(
        @Param() param,
        @GetUser() user: User,    
    ) : Promise<Object[]>{
        return this.postService.unlikePost(param.id, user);
    };

    @Post('/comment/:id')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    commentPost(
        @Body() createCommentDto: CreateCommentDto,
        @Param() param,
        @GetUser() user: User,    
    ) : Promise<Object[]>{
        return this.postService.commentPost(createCommentDto, param.id, user);
    };

    @Delete('/comment/:id/:comment_id')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    uncommentPost(
        @Param() param,
        @GetUser() user: User,    
    ) : Promise<Object[]>{
        return this.postService.uncomment(param.id, param.comment_id, user);
    };

}
