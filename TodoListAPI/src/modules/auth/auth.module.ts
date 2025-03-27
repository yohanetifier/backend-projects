import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
