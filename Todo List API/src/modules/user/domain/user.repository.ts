import { CreateUserDTo } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';

export interface UserRepository {
  getUser(user: GetUserDTO): Promise<any>;
  createUser(user: CreateUserDTo): Promise<any>;
}
