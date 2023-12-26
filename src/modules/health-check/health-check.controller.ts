import { Controller, Get } from '@nestjs/common';

@Controller('/api/health')
export class HealthCheckController {
  @Get()
  healthCheck(): string {
    return 'OK';
  }

  @Get('/memory')
  memory() {
    const { rss, heapTotal, heapUsed } = process.memoryUsage();
    const kbUnit = 1024 * 1024;
    return {
      rss: rss / kbUnit,
      heapTotal: heapTotal / kbUnit,
      heapUsed: heapUsed / kbUnit,
    };
  }
}
