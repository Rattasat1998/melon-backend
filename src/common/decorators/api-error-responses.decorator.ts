import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { ApiErrorResponseDto } from "../dto/api-error-response.dto";

const errorSchema = (example: ApiErrorResponseDto) => ({
  type: ApiErrorResponseDto,
  examples: {
    default: {
      value: example,
    },
  },
});

export function ApiValidationErrorResponse() {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiBadRequestResponse(
      errorSchema({
        statusCode: 400,
        error: "Bad Request",
        message: [
          "name must be shorter than or equal to 120 characters",
          "name must be a string",
        ],
        path: "/farms",
        timestamp: "2026-05-26T14:20:00.000Z",
      }),
    ),
  );
}

export function ApiBadRequestErrorResponse(message: string, path: string) {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiBadRequestResponse(
      errorSchema({
        statusCode: 400,
        error: "Bad Request",
        message,
        path,
        timestamp: "2026-05-26T14:20:00.000Z",
      }),
    ),
  );
}

export function ApiNotFoundErrorResponse(message: string, path: string) {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiNotFoundResponse(
      errorSchema({
        statusCode: 404,
        error: "Not Found",
        message,
        path,
        timestamp: "2026-05-26T14:20:00.000Z",
      }),
    ),
  );
}

export function ApiServerErrorResponse() {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiInternalServerErrorResponse(
      errorSchema({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Internal server error",
        path: "/health",
        timestamp: "2026-05-26T14:20:00.000Z",
      }),
    ),
  );
}
