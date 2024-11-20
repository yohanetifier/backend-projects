import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTo } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaUserRepository') private userRepository: UserRepository,
  ) {}
  createUser(user: CreateUserDTo) {
    return this.userRepository.createUser(user);
  }
  getUser(user: GetUserDTO) {
    return this.userRepository.getUser(user);
  }
}
