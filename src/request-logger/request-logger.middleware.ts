import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { IRequestDetails } from '../utils/types/request-details';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);
  use(req: IRequestDetails, res: Response, next: () => void) {
    const start = performance.now();
    const requestTime = new Date().toISOString();
    req.requestId = uuidv4();
    const { ip, method, baseUrl } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('close', () => {
      const end = performance.now();
      const { statusCode } = res;
      this.logger.log(
        `REQUEST_ID=${
          req.requestId
        } TIME=${requestTime} METHOD=${method} BASE_URL=${baseUrl} STATUS_CODE=${statusCode} USER_AGENT=${userAgent} IP=${ip} LATENCY=${
          end - start
        }ms`,
      );
    });
    next();
  }
}
