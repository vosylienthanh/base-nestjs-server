import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerByIpGuard } from '../../common/guards/throttle-by-ip.guard.js';
import { ConfigServiceModule } from '../config/config-service.module.js';
import { EntitiesModule } from '../entities/entities.module.js';
import { PrismaService } from './prisma/prisma.service.js';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 0,
        limit: 0,
      },
    ]),
    ConfigServiceModule,
  ],
  exports: [ConfigServiceModule, PrismaService, EntitiesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerByIpGuard,
    },
    PrismaService,
    EntitiesModule,
  ],
})
export class SharedModule {}
