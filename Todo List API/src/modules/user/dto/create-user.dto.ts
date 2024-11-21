import { User } from '../domain/user.entity';

export type CreateUserDTO = Omit<User, 'id'>;
