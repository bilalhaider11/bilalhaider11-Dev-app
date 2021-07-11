import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { Comment, CommentSchema } from './comment.schema';
// import { Like, LikeSchema } from './like.schema';
// import { Like, LikeSchema } from './like.schema';
import {User} from './user.schema';

// export type PostDocument = Posts & Document;


// @Schema()
export const PostSchema = new mongoose.Schema({

    // @Prop({type: mongoose.Schema.Types.ObjectId})
    // _id: mongoose.Schema.Types.ObjectId;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // @Prop({ required: true })
    text: {type: String, required: true },

    // @Prop()
    name: {type: String},

    // @Prop()
    avatar: {type: String},

    // @Prop({type: [LikeSchema] })
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        }
    ],

    // @Prop({type: [CommentSchema]})
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    // @Prop({ default: Date.now })
    date: {type: Date, default: Date.now},
});


export interface Like {
    id : String;
    user: mongoose.Schema.Types.ObjectId;
};

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
    comments:  Array<Comment>;
    date: Date;
}


// export const PostSchema = SchemaFactory.createForClass(Posts);