import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface User {
    id: mongoose.ObjectId;
    name: String;
    email: String;
    password: String;
    avatar: String;
    date: Date;
}
