import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGrowthLogDto } from "./dto/create-growth-log.dto";

@Injectable()
export class GrowthLogsService {
  constructor(private readonly prisma: PrismaService) {}

  list(cropCycleId?: string) {
    return this.prisma.growthLog.findMany({
      where: cropCycleId ? { cropCycleId } : undefined,
      orderBy: { loggedAt: "desc" },
      take: 100,
      include: {
        cropCycle: {
          select: {
            id: true,
            name: true,
            farm: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async create(dto: CreateGrowthLogDto) {
    const cropCycle = await this.prisma.cropCycle.findUnique({
      where: { id: dto.cropCycleId },
      select: { id: true },
    });

    if (!cropCycle) {
      throw new BadRequestException("Crop cycle does not exist");
    }

    return this.prisma.growthLog.create({ data: dto });
  }
}
