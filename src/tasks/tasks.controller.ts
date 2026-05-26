import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiBadRequestErrorResponse,
  ApiNotFoundErrorResponse,
  ApiServerErrorResponse,
  ApiValidationErrorResponse,
} from "../common/decorators/api-error-responses.decorator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";

@ApiTags("tasks")
@ApiServerErrorResponse()
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  list() {
    return this.tasksService.list();
  }

  @Post()
  @ApiValidationErrorResponse()
  @ApiBadRequestErrorResponse(
    "A task must belong to a farm or crop cycle",
    "/tasks",
  )
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Patch(":id/complete")
  @ApiNotFoundErrorResponse("Task not found", "/tasks/unknown-id/complete")
  complete(@Param("id") id: string) {
    return this.tasksService.complete(id);
  }
}
