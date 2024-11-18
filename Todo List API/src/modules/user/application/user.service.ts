import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}
  getUser() {
    return this.userRepository.getUser();
  }
}
