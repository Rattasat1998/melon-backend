import { Module } from "@nestjs/common";
import { GrowthLogsController } from "./growth-logs.controller";
import { GrowthLogsService } from "./growth-logs.service";

@Module({
  controllers: [GrowthLogsController],
  providers: [GrowthLogsService],
})
export class GrowthLogsModule {}
