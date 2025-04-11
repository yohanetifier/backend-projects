import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthRepository } from './infrastructure/auth.repository';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    // TodoModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [
    AuthService,
    { provide: 'JwtAuthRepository', useClass: JwtAuthRepository },
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
