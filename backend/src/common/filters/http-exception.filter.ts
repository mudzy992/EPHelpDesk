import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Interna greška servera';

    response.status(status).json({
      code:
        (typeof exceptionResponse === 'object' &&
          exceptionResponse !== null &&
          (exceptionResponse as any).code) ||
        HttpStatus[status] ||
        'INTERNAL_ERROR',
      message,
      details:
        typeof exceptionResponse === 'object' ? exceptionResponse : {},
    });
  }
}
