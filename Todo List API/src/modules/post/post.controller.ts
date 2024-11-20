import { Body, Controller, Headers, Header, Post } from '@nestjs/common';
import { PostService } from './application/post.service';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  createPost(@Body() post: CreatePostDTO, @Headers() header: any) {
    console.log('header', header.authorization);
    return this.postService.createPost(post);
  }
}
