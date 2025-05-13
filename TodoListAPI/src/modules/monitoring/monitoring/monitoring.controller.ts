import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get('/health')
  async healthCheck() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return { status: 'ok' };
    } catch {
      throw new InternalServerErrorException('Database not reacheable');
    }
  }
}
