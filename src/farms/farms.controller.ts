import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiNotFoundErrorResponse,
  ApiServerErrorResponse,
  ApiValidationErrorResponse,
} from "../common/decorators/api-error-responses.decorator";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { FarmsService } from "./farms.service";

@ApiTags("farms")
@ApiServerErrorResponse()
@Controller("farms")
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  list() {
    return this.farmsService.list();
  }

  @Post()
  @ApiValidationErrorResponse()
  create(@Body() dto: CreateFarmDto) {
    return this.farmsService.create(dto);
  }

  @Get(":id")
  @ApiNotFoundErrorResponse("Farm not found", "/farms/unknown-id")
  get(@Param("id") id: string) {
    return this.farmsService.get(id);
  }
}
