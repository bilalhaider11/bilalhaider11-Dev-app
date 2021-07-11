import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import * as config from 'config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(config.database,{
      useFindAndModify: false
    }),
    PostsModule,
    AuthModule,
    ProfileModule
  ],
})
export class AppModule {}
