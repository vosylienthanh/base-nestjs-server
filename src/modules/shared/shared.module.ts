import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerByIpGuard } from '../../common/guards/throttle-by-ip.guard';
import { ConfigServiceModule } from '../config/config-service.module';
import { ConfigService } from '../config/config.service';
import { HelperModule } from '../helper/helper.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.POSTGRES_CONFIG,
          // keepConnectionAlive: true,
        };
      },
      imports: [ConfigServiceModule],
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 0,
        limit: 0,
      },
    ]),
    ConfigServiceModule,
    HelperModule,
  ],
  exports: [TypeOrmModule, ConfigServiceModule, HelperModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerByIpGuard,
    },
  ],
})
export class SharedModule {}
