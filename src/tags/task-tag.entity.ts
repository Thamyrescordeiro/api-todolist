import { Column, ForeignKey, Table, Model } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.entity';
import { Tag } from './tags.entity';

@Table({ tableName: 'task_tags', timestamps: false })
export class TaskTag extends Model<TaskTag> {
  @ForeignKey(() => Task)
  @Column
  taskId: string;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
