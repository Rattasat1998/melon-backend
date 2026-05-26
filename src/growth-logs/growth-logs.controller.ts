import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiBadRequestErrorResponse,
  ApiServerErrorResponse,
  ApiValidationErrorResponse,
} from "../common/decorators/api-error-responses.decorator";
import { CreateGrowthLogDto } from "./dto/create-growth-log.dto";
import { GrowthLogsService } from "./growth-logs.service";

@ApiTags("growth-logs")
@ApiServerErrorResponse()
@Controller("growth-logs")
export class GrowthLogsController {
  constructor(private readonly growthLogsService: GrowthLogsService) {}

  @Get()
  list(@Query("cropCycleId") cropCycleId?: string) {
    return this.growthLogsService.list(cropCycleId);
  }

  @Post()
  @ApiValidationErrorResponse()
  @ApiBadRequestErrorResponse("Crop cycle does not exist", "/growth-logs")
  create(@Body() dto: CreateGrowthLogDto) {
    return this.growthLogsService.create(dto);
  }
}
