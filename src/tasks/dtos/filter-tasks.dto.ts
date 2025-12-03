import { IsArray, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TaskStatus } from '../taskstatus.enum';

export class FilterTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tags_id?: string[];
}
