import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../infrastructure/prisma.user.repository';

// export class UserService {
//   constructor(private userRepository: PrismaUserRepository) {}
//   getUser() {
//     // return this.userRepository.getUser();
//   }
//   createUser(user: User) {
//     // return this.userRepository.createUser(user);
//   }
// }

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaUserRepository') private userRepository: UserRepository,
  ) {}
  createUser() {
    return this.userRepository.createUser();
  }
}
