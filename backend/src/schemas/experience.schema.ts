
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';


// export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {

    // @Prop({type: mongoose.Schema.Types.ObjectId ,default: undefined})
    // id: String;

    @Prop({required: true}) 
    title: String;

    @Prop({required: true})
    company: String;

    @Prop()
    location: String;

    @Prop({required: true})
    from: Date;

    @Prop({default: null})
    to: Date;

    @Prop({default: false})
    current: Boolean;

    @Prop()
    description: String;
} 

// export const ExperienceSchema = SchemaFactory.createForClass(Experience);