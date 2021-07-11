import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export type UserDocument = User & mongoose.Document;


// @Schema()
export const UserSchema = new mongoose.Schema({

    // @Prop({type: mongoose.Schema.Types.ObjectId})
    // _id: mongoose.Schema.Types.ObjectId;
    
    // @Prop({ required: true })
    name: {type: String, required: true},

    // @Prop({ required: true, unique: true })
    email: { type: String, required: true, unique: true },

    // @Prop({ required: true })
    password: {type: String, required: true },

    // @Prop()
    avatar: { type: String },

    // @Prop({ default: Date.now })
    date: { type: Date, default: Date.now }
});

export interface User {
    id: mongoose.ObjectId;
    name: String;
    email: String;
    password: String;
    avatar: String;
    date: Date;
};


// export const UserSchema = SchemaFactory.createForClass(User);