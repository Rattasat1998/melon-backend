import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiErrorResponseDto } from "../dto/api-error-response.dto";

type ExceptionResponseBody = {
  error?: string;
  message?: string | string[];
  statusCode?: number;
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionBody = this.getExceptionBody(exception);
    const body: ApiErrorResponseDto = {
      statusCode,
      error: exceptionBody.error ?? this.getDefaultError(statusCode),
      message: exceptionBody.message ?? this.getDefaultMessage(statusCode),
      path: request.originalUrl || request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(body);
  }

  private getExceptionBody(exception: unknown): ExceptionResponseBody {
    if (!(exception instanceof HttpException)) {
      return {};
    }

    const response = exception.getResponse();
    if (typeof response === "string") {
      return { message: response };
    }

    return response as ExceptionResponseBody;
  }

  private getDefaultError(statusCode: number) {
    const statusText = HttpStatus[statusCode];
    if (typeof statusText !== "string") {
      return "Internal Server Error";
    }

    return statusText
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private getDefaultMessage(statusCode: number) {
    return statusCode === HttpStatus.INTERNAL_SERVER_ERROR
      ? "Internal server error"
      : this.getDefaultError(statusCode);
  }
}
