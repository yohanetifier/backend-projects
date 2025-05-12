import { Inject, Injectable } from '@nestjs/common';
import { GetUserDTO } from '../../user/dto/get-user.dto';
import { JwtAuthRepository } from '../infrastructure/auth.repository';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JwtAuthRepository')
    private authRepository: JwtAuthRepository,
  ) {}
  async signIn(credentials: GetUserDTO): Promise<any> {
    return this.authRepository.signIn(credentials);
  }

  async signUp(credentials: CreateUserDTO) {
    return this.authRepository.signUp(credentials);
  }
}
