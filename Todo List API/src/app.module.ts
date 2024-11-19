import { Module } from '@nestjs/common';
import { AppController } from './modules/user/app.controller';
import { UserService } from './modules/user/application/user.service';
import { PrismaRepository } from './modules/user/infrastructure/prisma.repository';
import { PrismaService } from './modules/user/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaRepository,
    },
  ],
})
export class AppModule {}
