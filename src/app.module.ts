import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CropCyclesModule } from "./crop-cycles/crop-cycles.module";
import { FarmsModule } from "./farms/farms.module";
import { GrowthLogsModule } from "./growth-logs/growth-logs.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    FarmsModule,
    CropCyclesModule,
    GrowthLogsModule,
    TasksModule,
  ],
})
export class AppModule {}
