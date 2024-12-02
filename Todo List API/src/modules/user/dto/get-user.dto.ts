import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../domain/user.entity';

export class GetUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
