import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CryptoHelperService {
  constructor(private readonly configService: ConfigService) {}

  hashString = async (src: string) => {
    return hash(src, this.configService.SALT_ROUNDS);
  };

  compareHashed = async (hashedStr: string, compareStr: string) => {
    return compare(compareStr, hashedStr);
  };
}
