import { PrismaService } from '../../../prisma.service';
import { UserRepository } from '../domain/user.repository';
import { Prisma } from '@prisma/client';
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

    // try {
    // } catch {
    //   const data: User = await this.prisma.user.create({
    //     data: { name, email, password: hashPassword },
    //   });
    // }
    // const SALT_ROUND = 10;
    // const { name, email, password } = user;
    // const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
    // try {
    //   const data: User = await this.prisma.user.create({
    //     data: { name, email, password: hashPassword },
    //   });
    //   if (data) {
    //     const PAYLOAD = { sub: data.id, username: name };
    //     const ACCESS_TOKEN = await this.jwtService.signAsync(PAYLOAD);
    //     return { token: ACCESS_TOKEN };
    //   }
    // } catch (err: any) {
    //   throw new Error('Email already exists');
    // }
  }
}
