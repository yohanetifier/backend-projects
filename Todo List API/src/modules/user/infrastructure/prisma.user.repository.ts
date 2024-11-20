import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../domain/user.repository';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTo } from '../dto/create-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  getUser(): any {
    return null;
  }
  async createUser(user: CreateUserDTo): Promise<any> {
    const SALT_ROUND = 10;
    const { name, email, password } = user;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
    try {
      const data: User = await this.prisma.user.create({
        data: { name, email, password: hashPassword },
      });
      if (data) {
        const PAYLOAD = { sub: data.id, username: name };
        const ACCESS_TOKEN = await this.jwtService.signAsync(PAYLOAD);
        return { token: ACCESS_TOKEN };
      }
    } catch (err: any) {
      throw new Error('Email already exists');
    }
  }
}
