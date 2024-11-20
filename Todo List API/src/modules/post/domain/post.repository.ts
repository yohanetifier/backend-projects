import { CreatePostDTO } from '../dto/create-post.dto';

export interface PostRepository {
  createPost(post: CreatePostDTO): string;
}
