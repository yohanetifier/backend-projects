import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';
import { User } from './user.entity';

export interface UserRepository {
  getUser(user: GetUserDTO): Promise<User | null>;
  createUser(user: CreateUserDTO): Promise<User | null>;
}
