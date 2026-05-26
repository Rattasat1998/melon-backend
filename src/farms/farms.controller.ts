import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { FarmsService } from "./farms.service";

@ApiTags("farms")
@Controller("farms")
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  list() {
    return this.farmsService.list();
  }

  @Post()
  create(@Body() dto: CreateFarmDto) {
    return this.farmsService.create(dto);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.farmsService.get(id);
  }
}
