import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TaskStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.task.findMany({
      orderBy: [{ status: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
      include: {
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        cropCycle: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(dto: CreateTaskDto) {
    if (!dto.farmId && !dto.cropCycleId) {
      throw new BadRequestException(
        "A task must belong to a farm or crop cycle",
      );
    }

    return this.prisma.task.create({ data: dto });
  }

  async complete(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        status: TaskStatus.DONE,
        completedAt: new Date(),
      },
    });
  }
}
