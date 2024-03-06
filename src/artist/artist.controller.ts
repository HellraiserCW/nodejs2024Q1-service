import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { Uuid } from '../app.validators';
import { Artist } from './interfaces/artist.interface';
import { NotFoundError } from '../app.errors';

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

      if (!artist) throw new NotFoundError();

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

      if (!artist) throw new NotFoundError();

      return await this.artistService.update(artist, artistDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isDeleted = await this.artistService.remove(id);

      if (!isDeleted) throw new NotFoundError();

      return;
    } catch (error) {
      throw error;
    }
  }
}
