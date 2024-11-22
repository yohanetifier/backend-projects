import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [TodoModule, UserModule, AuthModule],
})
export class AppModule {}
