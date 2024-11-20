import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaUserRepository') private userRepository: UserRepository,
  ) {}
  createUser(user: User) {
    return this.userRepository.createUser(user);
  }
}
