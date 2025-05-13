import { Module } from '@nestjs/common';
import { MonitoringController } from './monitoring/monitoring.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  controllers: [MonitoringController],
})
export class MonitoringModule {}
