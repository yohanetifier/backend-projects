import { Inject, Injectable } from '@nestjs/common';
import { PrismaPostRepository } from '../infrastructure/prismapost.repository';
import { CreatePostDTO } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('PrismaPostRepository')
    private readonly prismaPostRepository: PrismaPostRepository,
  ) {}
  createPost(post: CreatePostDTO) {
    console.log('post', post);
    console.log('in the post service');
  }
}
