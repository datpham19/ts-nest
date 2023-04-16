import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // check onChainSignature
    const signature = req.headers['onchainsignature'];
    if (signature !== '0x123') {
      throw new UnauthorizedException(
        'Could not authenticate onChainSignature. Please try again.',
      );
    }
    next();
  }
}
