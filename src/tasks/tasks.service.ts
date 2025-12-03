import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTasksDto } from './dtos/filter-tasks.dto';
import { TaskStatus } from './taskstatus.enum';
import { Tag } from '../tags/tags.entity';
import { Includeable } from 'sequelize';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async create(dto: CreateTaskDto, userId: string): Promise<Task> {
    const task = await this.taskModel.create({
      title: dto.title,
      description: dto.description,
      status: dto.status ?? TaskStatus.IN_PROGRESS,
      priority: dto.priority,
      user_id: userId,
    });

    if (dto.tagIds && dto.tagIds.length > 0) {
      await task.$set('tags', dto.tagIds);
      await task.reload({ include: ['tags'] });
    }

    return task;
  }

  async findAll(filter: FilterTasksDto, userId: string): Promise<Task[]> {
    const where = {
      user_id: userId,
      ...(filter.status && { status: filter.status }),
    };

    const include: Includeable[] = [];

    if (filter.tags_id && filter.tags_id.length > 0) {
      include.push({
        model: Tag,
        through: { attributes: [] },
        where: { id: filter.tags_id },
        required: true,
      });
    }

    return this.taskModel.findAll({ where, include });
  }

  async findByTagNames(user_id: string, names: string): Promise<Task[]> {
    const namesArray = names.split(',').map((n) => n.trim());

    return this.taskModel.findAll({
      where: { user_id },
      include: [
        {
          model: Tag,
          as: 'tags',
          where: { name: namesArray },
          required: true,
        },
      ],
    });
  }

  async findOne(task_id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({
      where: { task_id, user_id: userId },
      include: ['tags'],
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(
    task_id: string,
    dto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.findOne(task_id, userId);
    await task.update(dto);
    if (dto.tagIds) {
      await task.$set('tags', dto.tagIds);
      await task.reload({ include: ['tags'] });
    }
    return task;
  }

  async remove(task_id: string, userId: string) {
    const task = await this.findOne(task_id, userId);
    await task.destroy();
    return { message: 'Tag removed successfully' };
  }
}
