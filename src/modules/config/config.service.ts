import { Global } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Global()
export class ConfigService {
  constructor() {
    let path = `${__dirname}/../../../.env`;
    if (this.NODE_ENV) {
      path = `${path}.${this.NODE_ENV}`;
    }

    dotenv.config({
      path,
    });
  }

  get PORT(): number {
    return Number(process.env.PORT || 3000);
  }

  get NODE_ENV(): string {
    return process.env.NODE_ENV || 'development';
  }

  get IS_DEVELOPMENT_MODE(): boolean {
    return process.env.IS_DEVELOPMENT_MODE === 'development';
  }

  get LOG_LEVEL(): string {
    return process.env.LOG_LEVEL || 'debug';
  }

  get DATABASE_HOST(): string {
    return process.env.DATABASE_HOST || 'localhost';
  }

  get DATABASE_PORT(): number {
    return Number(process.env.DATABASE_PORT);
  }

  get DATABASE_USERNAME(): string {
    return process.env.DATABASE_USERNAME || 'admin';
  }

  get DATABASE_PASSWORD(): string {
    return process.env.DATABASE_PASSWORD || '123456';
  }

  get DATABASE_NAME(): string {
    return process.env.DATABASE_NAME || '';
  }

  get DATABASE_SCHEMA(): string {
    return process.env.DATABASE_SCHEMA || '';
  }

  get POSTGRES_CONNECTION_TIMEOUT(): number {
    return Number(process.env.POSTGRES_CONNECTION_TIMEOUT);
  }

  get POSTGRES_CONFIG(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.DATABASE_HOST,
      port: this.DATABASE_PORT,
      username: this.DATABASE_USERNAME,
      password: this.DATABASE_PASSWORD,
      database: this.DATABASE_NAME,
      schema: this.DATABASE_SCHEMA,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      logging: false,
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      keepConnectionAlive: true,
      connectTimeoutMS: this.POSTGRES_CONNECTION_TIMEOUT,
    };
  }
}

export const configService = new ConfigService();
