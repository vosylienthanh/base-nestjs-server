import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma, PrismaClient } from '../../../../generated/prisma/client.js';
import { BaseRepositoryAbstract } from '../../../common/abstracts/base-repository.abstract.js';
import { PrismaService } from '../../shared/prisma/prisma.service.js';

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<Prisma.UserDelegate> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  protected getRepository(
    prismaClient?: PrismaClient,
  ): Prisma.UserDelegate<DefaultArgs, {}> {
    return prismaClient?.user || this.prismaService.user;
  }

  async findMany(where: Prisma.UserWhereInput, prismaClient?: PrismaClient) {
    return this.getRepository(prismaClient).findMany({
      where,
    });
  }
}
