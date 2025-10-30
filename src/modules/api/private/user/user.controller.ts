import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '../../../entities/user/user.repository.js';

@Controller('/api/private/user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async findMany() {
    return this.userRepository.findMany({});
  }
}
