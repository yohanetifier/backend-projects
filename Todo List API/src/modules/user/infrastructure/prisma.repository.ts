import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { PrismaService } from '../prisma/prisma.service';

export class PrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  // updateUser: () => string;
  // constructor() {}
  getUser() {
    return [];
  }
  async createUser(user: User) {
    return await this.prisma.user.create({
      data: { name: 'test', email: 'test@test.fr', password: 'testpassword' },
    });
  }

  deleteUser() {
    return 'User delete';
  }
}
