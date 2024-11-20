import { Module } from '@nestjs/common';
import { AppController } from './modules/user/user.controller';
import { UserService } from './modules/user/application/user.service';
import { PrismaUserRepository } from './modules/user/infrastructure/prisma.user.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './modules/post/post.module';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    PostModule,
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
