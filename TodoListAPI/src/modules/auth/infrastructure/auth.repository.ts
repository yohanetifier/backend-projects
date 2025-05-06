import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/application/user.service';
import { GetUserDTO } from '../../user/dto/get-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { AuthRepository } from '../domain/auth.domain';

@Injectable()
export class JwtAuthRepository implements AuthRepository {
  constructor(
    private userService: UserService,
    // private todoService: TodoService,
    private jwtService: JwtService,
  ) {}
  async signIn(credentials: GetUserDTO): Promise<any> {
    const user = await this.userService.getUser(credentials);
    if (user) {
      const isGoodPassword = bcrypt.compareSync(
        credentials.password,
        user.password,
      );

      if (isGoodPassword) {
        return await this.generateToken(user.id, user.name);
      } else {
        throw new BadRequestException('Wrong password');
      }
    } else {
      throw new BadRequestException('Not user in the DB for this email ');
    }
  }

  async signUp(credentials: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(credentials);
      return this.generateToken(user.id, user.name);
    } catch {
      throw new BadRequestException('User already exist');
    }
  }

  async generateToken(id: number, name: string) {
    const payload = { sub: id, name };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        ignoreExpiration: false,
        secret: process.env.JWT_SECRET_KEY,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, name: payload.name },
        {
          expiresIn: '15m',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
