import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IRequestDetails } from '../utils/types/request-details';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    console.log('exception', exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<IRequestDetails>();
    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      errorResponse.message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      const { code } = exception.driverError;
      switch (code) {
        case '22P02':
          errorResponse.statusCode = HttpStatus.BAD_REQUEST;
          errorResponse.message = 'Invalid text representation';
          break;
        case '23503':
          errorResponse.statusCode = HttpStatus.BAD_REQUEST;
          errorResponse.message =
            'Some input fields do not exist in database or still being used';
          break;
        case '23505':
          errorResponse.statusCode = HttpStatus.BAD_REQUEST;
          errorResponse.message = 'Record already exists';
          break;
      }
    } else if (exception.code === 'ENOENT') {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.message = 'File not found';
    }

    this.logger.error(`REQUEST_ID=${request.requestId} ERROR=${exception}`);

    httpAdapter.reply(
      ctx.getResponse(),
      errorResponse,
      errorResponse.statusCode,
    );
  }
}
