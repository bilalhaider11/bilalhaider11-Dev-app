import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface Like {
    id: String;
    user: mongoose.Schema.Types.ObjectId;
}
export interface Comment {
    id: String;
    user: mongoose.Schema.Types.ObjectId;
    text: String;
    name: String;
    avatar: String;
    date: Date;
}
export interface Posts {
    id: mongoose.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    text: String;
    name: String;
    avatar: String;
    likes: Array<Like>;
    comments: Array<Comment>;
    date: Date;
}
