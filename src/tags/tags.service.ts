import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag, CreateTagsAttributes } from './tags.entity';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async create(dto: CreateTagDto, user_id: string): Promise<Tag> {
    const data: CreateTagsAttributes = {
      name: dto.name,
      color: dto.color,
      user_id: user_id,
    };
    return this.tagModel.create(data);
  }

  async findAll(user_id: string): Promise<Tag[]> {
    return this.tagModel.findAll({ where: { user_id: user_id } });
  }

  async findOne(tags_id: string, user_id: string): Promise<Tag> {
    const tag = await this.tagModel.findOne({
      where: { tags_id, user_id: user_id },
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(
    tags_id: string,
    dto: UpdateTagDto,
    user_id: string,
  ): Promise<Tag> {
    const tag = await this.findOne(tags_id, user_id);
    if (dto.name !== undefined) tag.name = dto.name;
    if (dto.color !== undefined) tag.color = dto.color;
    await tag.save();
    return tag;
  }

  async remove(tags_id: string, user_id: string) {
    const tag = await this.findOne(tags_id, user_id);
    await tag.destroy();
    return { message: 'Tag removed successfully' };
  }
}
