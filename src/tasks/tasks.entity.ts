import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TaskStatus } from './taskstatus.enum';
import { TaskTag } from '../tags/task-tag.entity';
import { Tag } from '../tags/tags.entity';
import { User } from '../users/users.entity';

export interface CreateTaskAttributes {
  title: string;
  description?: string;
  status?: string;
  priority?: number;
  user_id: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, CreateTaskAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  task_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.ENUM('IN_PROGRESS', 'DONE'),
    allowNull: false,
    defaultValue: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  priority: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @BelongsToMany(() => Tag, () => TaskTag)
  tags: Tag[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
