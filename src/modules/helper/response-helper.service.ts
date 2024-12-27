import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ResponseHelperService {
  accessDeniedHandler = (req: Request, res: Response) => {
    return res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      message: 'Unauthorize',
    });
  };
}
