import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
          keepConnectionAlive: true,
        };
      },
      imports: [ConfigServiceModule],
      inject: [ConfigService],
    }),
    ConfigServiceModule,
    HelperModule,
  ],
  exports: [TypeOrmModule, ConfigServiceModule, HelperModule],
})
export class SharedModule {}
