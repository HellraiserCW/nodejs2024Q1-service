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

import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { Uuid } from '../app.validators';
import { Artist } from './interfaces/artist.interface';
import { NotFoundError } from '../app.errors';
import { Entity } from '../app.config';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() artistDto: ArtistDto): Promise<Artist> {
    try {
      return await this.artistService.create(artistDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    try {
      return await this.artistService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: Uuid): Promise<Artist> {
    try {
      const artist = await this.artistService.findOne(id);

      if (!artist) throw new NotFoundError(Entity.Artist);

      return artist;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: Uuid,
    @Body() artistDto: ArtistDto,
  ): Promise<Artist> {
    try {
      const artist = await this.artistService.findOne(id);

      if (!artist) throw new NotFoundError(Entity.Artist);

      return await this.artistService.update(id, artistDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isArtist = await this.artistService.findOne(id);

      if (!isArtist) throw new NotFoundError(Entity.Artist);

      await this.artistService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
