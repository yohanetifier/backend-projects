import { Module } from '@nestjs/common';
import { AppController } from './modules/user/app.controller';
import { AppService } from './modules/user/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
