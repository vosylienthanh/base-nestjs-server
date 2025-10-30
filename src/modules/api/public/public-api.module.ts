import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module.js';

@Module({
  imports: [HealthCheckModule],
})
export class PublicApiModule {}
