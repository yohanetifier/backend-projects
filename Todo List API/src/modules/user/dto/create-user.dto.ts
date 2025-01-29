import { User } from '../domain/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

// export type CreateUserDTO = Omit<User, 'id'>;

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
