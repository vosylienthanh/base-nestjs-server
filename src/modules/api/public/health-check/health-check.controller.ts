import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Throttle({
  default: {
    limit: 1,
    ttl: 10000,
  },
})
@Controller('/api/public/health')
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
