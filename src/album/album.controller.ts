import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './interfaces/album.interface';
import { Uuid } from '../app.validators';
import { NotFoundError } from '../app.errors';
import { Entity } from '../app.config';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() albumDto: AlbumDto): Promise<Album> {
    try {
      return await this.albumService.create(albumDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Album[]> {
    try {
      return await this.albumService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: Uuid): Promise<Album> {
    try {
      const album = await this.albumService.findOne(id);

      if (!album) throw new NotFoundError(Entity.Album);

      return album;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: Uuid,
    @Body() albumDto: AlbumDto,
  ): Promise<Album> {
    try {
      const album = await this.albumService.findOne(id);

      if (!album) throw new NotFoundError(Entity.Album);

      return await this.albumService.update(album, albumDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isDeleted = await this.albumService.remove(id);

      if (!isDeleted) throw new NotFoundError(Entity.Album);

      return;
    } catch (error) {
      throw error;
    }
  }
}
