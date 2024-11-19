import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../domain/user.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../domain/user.entity';

export class PrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}
  updateUser: () => string;
  // constructor() {}
  getUser(): Promise<User> {
    return this.prisma.user.findMany({});
  }
  createUser() {
    return 'this';
  }

  deleteUser() {
    return 'User delete';
  }
}
