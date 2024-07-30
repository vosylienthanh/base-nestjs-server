import { DataSource } from 'typeorm';
import { configService } from './config.service';

export const AppDataSource = new DataSource(configService.POSTGRES_CONFIG);
