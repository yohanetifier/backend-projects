import { Post } from '../domain/post.entity';

export type CreatePostDTO = Omit<Post, 'id'>;
