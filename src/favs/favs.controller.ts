import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { FavsService } from './favs.service';
import { Uuid } from '../app.validators';
import { FavoritesResponse } from './interfaces/favs.interface';
import { Entity } from '../app.config';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(`${Entity.Track}/:id`)
  async addTrack(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.addTrack(id);
  }

  @Delete(`${Entity.Track}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.removeTrack(id);
  }

  @Post(`${Entity.Artist}/:id`)
  async addArtist(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.addArtist(id);
  }

  @Delete(`${Entity.Artist}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.removeArtist(id);
  }

  @Post(`${Entity.Album}/:id`)
  async addAlbum(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.addAlbum(id);
  }

  @Delete(`${Entity.Album}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param() { id }: Uuid): Promise<void> {
    await this.favsService.removeAlbum(id);
  }

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }
}
