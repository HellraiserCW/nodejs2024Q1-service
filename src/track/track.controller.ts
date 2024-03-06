import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { Track } from './interfaces/track.interface';
import { Uuid } from '../app.validators';
import { NotFoundError } from '../app.errors';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() trackDto: TrackDto): Promise<Track> {
    try {
      return await this.trackService.create(trackDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Track[]> {
    try {
      return await this.trackService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: Uuid): Promise<Track> {
    try {
      const track = await this.trackService.findOne(id);

      if (!track) throw new NotFoundError();

      return track;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: Uuid,
    @Body() trackDto: TrackDto,
  ): Promise<Track> {
    try {
      const track = await this.trackService.findOne(id);

      if (!track) throw new NotFoundError();

      return await this.trackService.update(track, trackDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isDeleted = await this.trackService.remove(id);

      if (!isDeleted) throw new NotFoundError();

      return;
    } catch (error) {
      throw error;
    }
  }
}
