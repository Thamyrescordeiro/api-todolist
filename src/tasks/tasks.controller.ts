import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTasksDto } from './dtos/filter-tasks.dto';
import type { AuthRequest } from '../auth/auth-request.type';
import { Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req: AuthRequest) {
    return this.tasksService.create(dto, req.user.user_id);
  }

  @Get('by-tag-name/:name')
  async getByTagName(@Param('name') name: string, @Req() req: AuthRequest) {
    return this.tasksService.findByTagNames(req.user.user_id, name);
  }

  @Get()
  findAll(
    @Query('tags_id') tags_id: string,
    @Query('status') status: string,
    @Req() req: AuthRequest,
  ) {
    const filter: FilterTasksDto = {
      tags_id: tags_id ? tags_id.split(',') : undefined,
      status: status as unknown as FilterTasksDto['status'],
    };
    return this.tasksService.findAll(filter, req.user.user_id);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) task_id: string,
    @Req() req: AuthRequest,
  ) {
    return this.tasksService.findOne(task_id, req.user.user_id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: AuthRequest,
  ) {
    return this.tasksService.update(id, dto, req.user.user_id);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) task_id: string,
    @Req() req: AuthRequest,
  ) {
    return this.tasksService.remove(task_id, req.user.user_id);
  }
}
