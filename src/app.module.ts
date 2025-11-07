import { Module } from '@nestjs/common';
import { PrivateApiModule } from './modules/api/private/private-api.module.js';
import { PublicApiModule } from './modules/api/public/public-api.module.js';
import { SharedModule } from './modules/shared/shared.module.js';

@Module({
  imports: [SharedModule, PublicApiModule, PrivateApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
