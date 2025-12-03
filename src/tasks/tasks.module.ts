import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks.entity';
import { Tag } from '../tags/tags.entity';
import { TaskTag } from '../tags/task-tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Task, Tag, TaskTag])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
