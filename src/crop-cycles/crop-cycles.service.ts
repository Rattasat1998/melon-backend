import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCropCycleDto } from "./dto/create-crop-cycle.dto";

@Injectable()
export class CropCyclesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.cropCycle.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        farm: true,
        _count: {
          select: {
            growthLogs: true,
            tasks: true,
            sensorReadings: true,
          },
        },
      },
    });
  }

  create(dto: CreateCropCycleDto) {
    return this.prisma.cropCycle.create({ data: dto });
  }

  async get(id: string) {
    const cropCycle = await this.prisma.cropCycle.findUnique({
      where: { id },
      include: {
        farm: true,
        growthLogs: {
          orderBy: { loggedAt: "desc" },
          take: 50,
        },
        tasks: {
          orderBy: { dueAt: "asc" },
        },
        sensorReadings: {
          orderBy: { recordedAt: "desc" },
          take: 100,
        },
      },
    });

    if (!cropCycle) {
      throw new NotFoundException("Crop cycle not found");
    }

    return cropCycle;
  }
}
