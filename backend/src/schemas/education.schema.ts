
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';


// export type EducationDocument = Education & Document;

// @Schema()
// export class Education {

//     @Prop({type:mongoose.Schema.Types.ObjectId ,default: undefined})
//     id: mongoose.ObjectId;

//     @Prop({required: true}) 
//     school: String;

//     @Prop({required: true})
//     degree: String;

//     @Prop({required: true})
//     fieldofstudy: String;

//     @Prop({required: true})
//     from: Date;

//     @Prop({default: null})
//     to: Date;

//     @Prop({default: false})
//     current: Boolean;

//     @Prop()
//     description: String;
// } 

// export const EducationSchema = SchemaFactory.createForClass(Education);