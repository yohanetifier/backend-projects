import { User } from '../domain/user.entity';

export type CreateUserDTo = Omit<User, 'id'>;
