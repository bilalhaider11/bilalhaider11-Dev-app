import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
// import { Education, EducationSchema } from "./education.schema";
import { Experience } from "./experience.schema";
// import { Experience, ExperienceSchema } from "./experience.schema";
import { User } from "./user.schema";

export type ProfileDocument = Profile & Document

export class Education {

    // @Prop({type:mongoose.Schema.Types.ObjectId ,default: undefined})
    // id: mongoose.ObjectId;

    @Prop({required: true}) 
    school: String;

    @Prop({required: true})
    degree: String;

    @Prop({required: true})
    fieldofstudy: String;

    @Prop({required: true})
    from: Date;

    @Prop({default: null})
    to: Date;

    @Prop({default: false})
    current: Boolean;

    @Prop()
    description: String;
} 

@Schema()
export class Social {
    @Prop()
    youtube: String;

    @Prop()
    twitter: String;

    @Prop()
    facebook: String;

    @Prop()
    linkedin: String;

    @Prop()
    instagram: String;
}

@Schema()
export class Profile {

    @Prop({ type: mongoose.Schema.Types.ObjectId ,default: undefined})
    id: mongoose.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.ObjectId;

    @Prop()
    company: String;

    @Prop()
    website: String;

    @Prop()
    locations: String;

    @Prop({required: true})
    status: String;

    @Prop({required: true})
    skills: String[];

    @Prop()
    bio: String;

    @Prop()
    githubusername: String;
    
    @Prop({type: [Object], 
        title: {required: true},
        company: {required: true},
        from: {required: true},
        current: {default: false},
        to: {default: null}
    })
    experience: [{
        title: String,
        company: String,
        location: String,
        from: Date,
        to: Date,
        current: Boolean,
        description: String
    }
    ];

    @Prop({type: [Object]})
    education:Education[];

    @Prop({type: Social})
    social: Social;

    @Prop({default: Date.now})
    date: Date;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);