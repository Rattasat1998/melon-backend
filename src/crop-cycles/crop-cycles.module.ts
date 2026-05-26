import { Module } from "@nestjs/common";
import { CropCyclesController } from "./crop-cycles.controller";
import { CropCyclesService } from "./crop-cycles.service";

@Module({
  controllers: [CropCyclesController],
  providers: [CropCyclesService],
})
export class CropCyclesModule {}
