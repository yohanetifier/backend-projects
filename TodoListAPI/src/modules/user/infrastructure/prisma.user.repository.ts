import { PrismaService } from '../../../prisma.service';
import { UserRepository } from '../domain/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async getUser(user: GetUserDTO): Promise<User | null> {
    const { email } = user;
    const userByEmail =
      (await this.prisma.user.findUnique({ where: { email } })) ?? null;

    return userByEmail;
  }

  async createUser(user: CreateUserDTO) {
    const { name, password, email } = user;
    const SALT_ROUND = 10;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
    const userCreated =
      (await this.prisma.user.create({
        data: { name, password: hashPassword, email },
      })) ?? null;

    return userCreated;
  }
}
