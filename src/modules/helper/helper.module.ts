import { Global, Module } from '@nestjs/common';
import { ResponseHelperService } from './response-helper.service';

@Global()
@Module({
  providers: [ResponseHelperService],
  exports: [ResponseHelperService],
})
export class HelperModule {}
