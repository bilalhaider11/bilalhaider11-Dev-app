import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
// import { Education, EducationSchema } from 'src/schemas/education.schema';
// import { Experience, ExperienceSchema } from 'src/schemas/experience.schema';  
import { PostSchema } from 'src/schemas/post.schema';
import { Profile, ProfileSchema } from 'src/schemas/profile.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Profile.name, schema: ProfileSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Post', schema: PostSchema}]),
    // MongooseModule.forFeature([{name: Experience.name, schema: ExperienceSchema}]),
    // MongooseModule.forFeature([{name: Education.name, schema: EducationSchema}]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'somesupersecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class ProfileModule {}
