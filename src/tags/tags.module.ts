import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './tags.entity';
import { Task } from '../tasks/tasks.entity';
import { TaskTag } from './task-tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tag, Task, TaskTag])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
