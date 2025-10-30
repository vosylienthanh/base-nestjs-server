import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller.js';

@Module({
  imports: [],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
