import { Module } from '@nestjs/common';
import { AppController } from './user.controller';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'PrismaUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
