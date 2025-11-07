import { Module } from '@nestjs/common';
import { UserRepository } from '../../entities/user/user.repository.js';
import { UserController } from './user/user.controller.js';

@Module({
  providers: [UserRepository],
  controllers: [UserController],
})
export class PrivateApiModule {}
