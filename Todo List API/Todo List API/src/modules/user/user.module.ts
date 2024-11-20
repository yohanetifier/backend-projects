import { Module } from '@nestjs/common';
import { AppController } from './user.controller';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
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
