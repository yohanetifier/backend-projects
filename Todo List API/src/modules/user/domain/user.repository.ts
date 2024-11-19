import { User } from './user.entity';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUser(): User[];
}
