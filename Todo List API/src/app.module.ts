import { Module } from '@nestjs/common';
import { AppController } from './modules/user/app.controller';
// import { AppService } from './modules/user/app.service';
import { UserService } from './modules/user/application/user.service';
import { PrismaRepository } from './modules/user/infrastructure/prisma.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaRepository,
    },
  ],
})
export class AppModule {}
