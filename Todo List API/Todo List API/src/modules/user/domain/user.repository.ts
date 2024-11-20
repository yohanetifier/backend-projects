import { User } from './user.entity';

export interface UserRepository {
  getUser(): string;
  createUser(): any;
}
