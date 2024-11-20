import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {
    console.log('prisma', prisma);
  }
  getUser(): any {
    return this.prisma.user.create({ data: { email: 'test@test.fr' } });
  }
  async createUser(): Promise<any> {
    // return 'in create user';
    return this.prisma.user.create({
      data: { name: 'test', email: 'test@test.fr' },
    });
    // console.log('user', user);
  }
}
