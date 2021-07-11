import { Posts } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class PostsController {
    private postService;
    constructor(postService: PostsService);
    createPost(createPostDto: CreatePostDto, user: User): Promise<Posts>;
    getAllPosts(): Promise<Posts[]>;
    getPostById(params: any): Promise<Posts>;
    deletePost(param: any, user: User): Promise<void>;
    likePost(param: any, user: User): Promise<Object[]>;
    unlikePost(param: any, user: User): Promise<Object[]>;
    commentPost(createCommentDto: CreateCommentDto, param: any, user: User): Promise<Object[]>;
    uncommentPost(param: any, user: User): Promise<Object[]>;
}
