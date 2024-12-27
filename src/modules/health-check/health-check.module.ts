import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from '../../guards/throttle.guard';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 1,
        ttl: 10000,
      },
    ]),
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class HealthCheckModule {}
