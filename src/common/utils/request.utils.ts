import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CryptoHelperService } from '../../modules/shared/crypto/crypto-helper.service.js';

class RequestUtils {
  private extractData = (src: string) => {
    const [ivBase64, encryptedDataBase64, authTagBase64] = src.split('_');

    return {
      ivBase64,
      encryptedDataBase64,
      authTagBase64,
    };
  };

  preProcessingReq = async <T extends object>({
    cryptoHelperService,
    data,
    cls,
  }: {
    data: string;
    cryptoHelperService: CryptoHelperService;
    cls: ClassConstructor<T>;
  }): Promise<T> => {
    const { authTagBase64, encryptedDataBase64, ivBase64 } =
      this.extractData(data);
    if (!authTagBase64 || !encryptedDataBase64 || !ivBase64) {
      throw new BadRequestException('Incorrect encryption.');
    }

    const decryptedData = cryptoHelperService.decryptAES({
      authTag: authTagBase64,
      iv: ivBase64,
      src: encryptedDataBase64,
    });
    const reqData = plainToInstance(cls, JSON.parse(decryptedData));
    const validationResult = await validate(reqData, {
      stopAtFirstError: true,
    });
    if (validationResult.length) {
      for (const value of Object.values(
        validationResult[0].constraints || {},
      )) {
        throw new BadRequestException(value);
      }
    }

    return reqData;
  };
}

export const requestUtils = new RequestUtils();
