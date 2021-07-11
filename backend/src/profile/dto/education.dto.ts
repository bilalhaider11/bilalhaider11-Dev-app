import { IsNotEmpty } from "class-validator";

export class EducationDto {
    @IsNotEmpty({message: 'School should not be empty!'})
    school: String;

    @IsNotEmpty({message: 'Degree should not be empty!'})
    degree: String;

    @IsNotEmpty({message: 'Field of Study should not be empty!'})
    fieldofstudy: String;
  
    @IsNotEmpty({message: 'Date is required!'})
    from: Date;

    to: Date;

    current: Boolean;

    description: String;
};