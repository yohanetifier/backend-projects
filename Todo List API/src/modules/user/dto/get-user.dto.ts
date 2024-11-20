import { User } from '../domain/user.entity';

export type GetUserDTO = Omit<User, 'id' | 'name'>;
