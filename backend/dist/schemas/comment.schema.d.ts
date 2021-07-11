import { User } from "./user.schema";
import * as mongoose from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    user: User;
    text: string;
    name: String;
    avatar: String;
    date: Date;
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<any, any, any>, undefined, any>;
