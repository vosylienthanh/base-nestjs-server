import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigServiceModule } from '../config/config-service.module';
import { ConfigService } from '../config/config.service';

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
  ],
  exports: [TypeOrmModule, ConfigServiceModule],
})
export class SharedModule {}
