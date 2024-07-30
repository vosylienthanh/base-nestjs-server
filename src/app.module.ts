import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [SharedModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
