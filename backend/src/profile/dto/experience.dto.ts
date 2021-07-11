import { IsDate, IsNotEmpty } from "class-validator";
import { type } from "os";

export class ExperienceDto {
    @IsNotEmpty({message: 'Title should not be empty!'})
    title: String;

    @IsNotEmpty({message: 'Company should not be empty!'})
    company: String;

    location: String;
  
    @IsNotEmpty({message: 'From date is required!'})
    from: Date;

    to: Date;

    current: Boolean;

    description: String;
};