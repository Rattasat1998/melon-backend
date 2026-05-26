import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFarmDto } from "./dto/create-farm.dto";

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.farm.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            cropCycles: true,
            tasks: true,
          },
        },
      },
    });
  }

  create(dto: CreateFarmDto) {
    return this.prisma.farm.create({ data: dto });
  }

  async get(id: string) {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: {
        cropCycles: {
          orderBy: { createdAt: "desc" },
        },
        tasks: {
          orderBy: { dueAt: "asc" },
        },
      },
    });

    if (!farm) {
      throw new NotFoundException("Farm not found");
    }

    return farm;
  }
}
