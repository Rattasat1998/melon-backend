import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CropCyclesService } from "./crop-cycles.service";
import { CreateCropCycleDto } from "./dto/create-crop-cycle.dto";

@ApiTags("crop-cycles")
@Controller("crop-cycles")
export class CropCyclesController {
  constructor(private readonly cropCyclesService: CropCyclesService) {}

  @Get()
  list() {
    return this.cropCyclesService.list();
  }

  @Post()
  create(@Body() dto: CreateCropCycleDto) {
    return this.cropCyclesService.create(dto);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.cropCyclesService.get(id);
  }
}
