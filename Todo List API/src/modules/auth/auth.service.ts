import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/application/user.service';
import { GetUserDTO } from '../user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(credentials: GetUserDTO): Promise<any> {
    const user = await this.userService.getUser(credentials);
    console.log('user', user);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // // TODO: Generate a JWT and return it here
    // // instead of the user object
    // return result;
  }
}
