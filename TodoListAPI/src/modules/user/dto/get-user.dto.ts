import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
