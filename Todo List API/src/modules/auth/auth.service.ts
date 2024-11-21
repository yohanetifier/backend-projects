import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/application/user.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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
        const PAYLOAD = { sub: user.id, name: user.name };
        const ACCESS_TOKEN = await this.jwtService.signAsync(PAYLOAD);
        return { token: ACCESS_TOKEN };
      } else {
        throw new Error('Wrong password');
      }
    } else {
      throw new Error('Not user in the DB for this email ');
    }
  }
}
