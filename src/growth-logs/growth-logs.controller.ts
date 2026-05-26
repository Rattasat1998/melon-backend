import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGrowthLogDto } from "./dto/create-growth-log.dto";
import { GrowthLogsService } from "./growth-logs.service";

@ApiTags("growth-logs")
@Controller("growth-logs")
export class GrowthLogsController {
  constructor(private readonly growthLogsService: GrowthLogsService) {}

  @Get()
  list(@Query("cropCycleId") cropCycleId?: string) {
    return this.growthLogsService.list(cropCycleId);
  }

  @Post()
  create(@Body() dto: CreateGrowthLogDto) {
    return this.growthLogsService.create(dto);
  }
}
