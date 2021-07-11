import * as mongoose from 'mongoose';
export declare type ProfileDocument = Profile & Document;
export declare class Education {
    school: String;
    degree: String;
    fieldofstudy: String;
    from: Date;
    to: Date;
    current: Boolean;
    description: String;
}
export declare class Social {
    youtube: String;
    twitter: String;
    facebook: String;
    linkedin: String;
    instagram: String;
}
export declare class Profile {
    id: mongoose.ObjectId;
    user: mongoose.ObjectId;
    company: String;
    website: String;
    locations: String;
    status: String;
    skills: String[];
    bio: String;
    githubusername: String;
    experience: [
        {
            title: String;
            company: String;
            location: String;
            from: Date;
            to: Date;
            current: Boolean;
            description: String;
        }
    ];
    education: Education[];
    social: Social;
    date: Date;
}
export declare const ProfileSchema: mongoose.Schema<mongoose.Document<Profile, any, any>, mongoose.Model<any, any, any>, undefined, any>;
