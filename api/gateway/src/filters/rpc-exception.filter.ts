import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  private readonly errorStatus = {
    user_not_found: HttpStatus.NOT_FOUND,
  };

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (this.errorStatus.hasOwnProperty(exception.message)) {
      status = this.errorStatus[exception.message];
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });

    return super.catch(exception, host);
  }
}
