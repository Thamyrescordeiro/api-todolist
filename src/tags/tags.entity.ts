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
import { User } from '../users/users.entity';
import { Task } from '../tasks/tasks.entity';
import { TaskTag } from './task-tag.entity';

export interface CreateTagsAttributes {
  name: string;
  color: string;
  user_id: string;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, CreateTagsAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare tags_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare color: string;

  @BelongsToMany(() => Task, () => TaskTag)
  tasks: Task[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare user_id: string;

  @BelongsTo(() => User)
  declare user: User;
}
