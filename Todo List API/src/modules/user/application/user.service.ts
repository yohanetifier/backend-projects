import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}
  getUser() {
    return this.userRepository.getUser();
  }
  createUser(user: CreateUserDTO) {
    return this.userRepository.createUser(user);
  }
}
