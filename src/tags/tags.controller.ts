import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import type { AuthRequest } from '../auth/auth-request.type';
import { Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() dto: CreateTagDto, @Req() req: AuthRequest) {
    return this.tagsService.create(dto, req.user.user_id);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.tagsService.findAll(req.user.user_id);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: AuthRequest,
  ) {
    return this.tagsService.findOne(id, req.user.user_id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTagDto,
    @Req() req: AuthRequest,
  ) {
    return this.tagsService.update(id, dto, req.user.user_id);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: AuthRequest,
  ) {
    return this.tagsService.remove(id, req.user.user_id);
  }
}
