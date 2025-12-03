import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare user_id: string;

  @BelongsTo(() => User)
  declare user: User;
}
