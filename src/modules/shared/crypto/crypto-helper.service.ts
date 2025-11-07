import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ConfigService } from '../../config/config.service.js';

@Injectable()
export class CryptoHelperService {
  constructor(private readonly configService: ConfigService) {}

  hashString = async (src: string) => {
    return hash(src, this.configService.SALT_ROUNDS);
  };

  compareHashed = async (hashedStr: string, compareStr: string) => {
    return compare(compareStr, hashedStr);
  };

  encryptAES = (src: string) => {
    const iv = randomBytes(12);
    const cipher = createCipheriv(
      'aes-256-gcm',
      Buffer.from(this.configService.ENCRYPTION_KEY),
      iv,
    );
    let encrypted = cipher.update(src, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return {
      encryptedData: encrypted,
      authTag: cipher.getAuthTag().toString('base64'),
      iv: iv.toString('base64'),
    };
  };

  decryptAES = ({
    authTag,
    src,
    iv,
  }: {
    src: string;
    authTag: string;
    iv: string;
  }) => {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      Buffer.from(this.configService.ENCRYPTION_KEY),
      Buffer.from(iv, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(authTag, 'base64'));
    let encrypted = decipher.update(src, 'base64', 'utf8');
    encrypted += decipher.final('utf-8');

    return encrypted;
  };
}
