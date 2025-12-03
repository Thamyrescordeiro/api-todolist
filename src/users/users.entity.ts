import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Task } from '../tasks/tasks.entity';
import { Tag } from '../tags/tags.entity';

export interface UserAttributes {
  user_id: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => Tag)
  tags: Tag[];
}
