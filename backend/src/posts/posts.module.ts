import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import {  UserSchema } from 'src/schemas/user.schema';
import {  PostSchema } from '../schemas/post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Posts', schema: PostSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Like', schema: PostSchema}]),
    MongooseModule.forFeature([{name: 'Comment', schema: PostSchema}]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'somesupersecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class PostsModule {}
