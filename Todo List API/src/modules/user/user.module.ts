import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { PrismaService } from 'src/prisma.service';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'PrismaUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [AppController],
  exports: [UserService],
})
export class UserModule {}
