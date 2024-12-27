import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    // console.log(
    //   req.headers['x-forwarded-for']?.toString() ||
    //     req.socket.remoteAddress ||
    //     '',
    // );

    return (
      req.headers['x-forwarded-for']?.toString() ||
      req.socket.remoteAddress ||
      ''
    );
  }
}
