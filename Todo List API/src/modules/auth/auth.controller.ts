import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signIn(@Body() user: GetUserDTO) {
    return this.authService.signIn(user);
  }
}
