import { User } from './user.entity';

export interface UserRepository {
  createUser: () => string;
  getUser: () => User[];
  updateUser: () => string;
  deleteUser: () => string;
}
