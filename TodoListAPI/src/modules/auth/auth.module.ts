import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TodoModule } from '../todo/todo.module';
import { JwtAuthRepository } from './infrastructure/auth.repository';

@Module({
  imports: [
    TodoModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [
    AuthService,
    { provide: 'JwtAuthRepository', useClass: JwtAuthRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
