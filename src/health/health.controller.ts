import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiServerErrorResponse } from "../common/decorators/api-error-responses.decorator";

@ApiTags("health")
@ApiServerErrorResponse()
@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: "melon-backend",
      timestamp: new Date().toISOString(),
    };
  }
}
