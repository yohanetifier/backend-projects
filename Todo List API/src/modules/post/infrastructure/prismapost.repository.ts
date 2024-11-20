import { PostRepository } from '../domain/post.repository';
import { CreatePostDTO } from '../dto/create-post.dto';
import { PostService } from '../application/post.service';

export class PrismaPostRepository implements PostRepository {
  constructor(private readonly postService: PostService) {}
  createPost(post: CreatePostDTO): string {
    return 'true';
  }
}
