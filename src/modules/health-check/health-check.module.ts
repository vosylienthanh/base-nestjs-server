import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 1,
        ttl: 60000,
      },
    ]),
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class HealthCheckModule {}
