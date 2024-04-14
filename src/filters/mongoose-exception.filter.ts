import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type, message) => {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
        message: message || 'Internal server error',
      });
    };
    console.log(exception);
    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (exception instanceof MongoError) {
      responseMessage('MongoError', exception.message);
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}