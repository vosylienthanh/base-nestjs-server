import { Module } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service.js';
import { UserRepository } from './user/user.repository.js';

@Module({
  imports: [PrismaService],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class EntitiesModule {}
