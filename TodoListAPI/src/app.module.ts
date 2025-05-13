import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    MonitoringModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
