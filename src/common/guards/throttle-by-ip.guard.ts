import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ThrottlerByIpGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    return (
      req.headers['x-forwarded-for']?.toString() ||
      req.socket.remoteAddress ||
      ''
    );
  }
}
