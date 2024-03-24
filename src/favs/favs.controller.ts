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
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { Uuid } from '../app.validators';
import { NotExistingError } from '../app.errors';
import { FavoritesResponse } from './interfaces/favs.interface';
import { Entity, Action } from '../app.config';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Post(`${Entity.Track}/:id`)
  async addTrack(@Param() { id }: Uuid): Promise<void> {
    const isTrack = await this.trackService.findOne(id);

    if (!isTrack) throw new NotExistingError(Entity.Track, Action.Add);

    await this.favsService.addTrack(id);
  }

  @Delete(`${Entity.Track}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param() { id }: Uuid): Promise<void> {
    const isTrack = await this.trackService.findOne(id);

    if (!isTrack) throw new NotExistingError(Entity.Track, Action.Remove);

    await this.favsService.removeTrack(isTrack);
  }

  @Post(`${Entity.Artist}/:id`)
  async addArtist(@Param() { id }: Uuid): Promise<void> {
    const isArtist = await this.artistService.findOne(id);

    if (!isArtist) throw new NotExistingError(Entity.Artist, Action.Add);

    await this.favsService.addArtist(id);
  }

  @Delete(`${Entity.Artist}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param() { id }: Uuid): Promise<void> {
    const isArtist = await this.artistService.findOne(id);

    if (!isArtist) throw new NotExistingError(Entity.Artist, Action.Remove);

    await this.favsService.removeArtist(isArtist);
  }

  @Post(`${Entity.Album}/:id`)
  async addAlbum(@Param() { id }: Uuid): Promise<void> {
    const album = await this.albumService.findOne(id);

    if (!album) throw new NotExistingError(Entity.Album, Action.Add);

    return await this.favsService.addAlbum(id);
  }

  @Delete(`${Entity.Album}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param() { id }: Uuid): Promise<void> {
    const isAlbum = await this.albumService.findOne(id);

    if (!isAlbum) throw new NotExistingError(Entity.Album, Action.Remove);

    await this.favsService.removeAlbum(isAlbum);
  }

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }
}
