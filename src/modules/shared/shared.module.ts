import { Global, Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config-service.module';
import { HelperModule } from '../helper/helper.module';

@Global()
@Module({
  imports: [ConfigServiceModule, HelperModule],
  exports: [ConfigServiceModule, HelperModule],
})
export class SharedModule {}
