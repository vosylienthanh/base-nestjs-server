import { Module } from '@nestjs/common';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [HealthCheckModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
