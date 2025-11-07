import { PrismaClient } from '../../../generated/prisma/client.js';

export abstract class BaseRepositoryAbstract<T> {
  protected abstract getRepository(prismaClient?: PrismaClient): T;
}
