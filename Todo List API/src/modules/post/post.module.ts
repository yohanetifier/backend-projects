import { Module } from '@nestjs/common';
import { PostService } from './application/post.service';
import { PostController } from './post.controller';
import { PrismaPostRepository } from './infrastructure/prismapost.repository';

@Module({
  providers: [
    PostService,
    {
      provide: 'PrismaPostRepository',
      useClass: PrismaPostRepository,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
