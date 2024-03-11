import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { FavsService } from './favs.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { Uuid } from '../app.validators';
import { NotExistingError } from '../app.errors';
import { FavoritesResponse } from './interfaces/favs.interface';
import { Track } from '../track/interfaces/track.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Album } from '../album/interfaces/album.interface';
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
  async addTrack(@Param() { id }: Uuid): Promise<Track> {
    const track = await this.trackService.findOne(id);

    if (!track) throw new NotExistingError(Entity.Track, Action.Add);

    return await this.favsService.addTrack(id);
  }

  @Delete(`${Entity.Track}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param() { id }: Uuid): Promise<void> {
    const isDeleted = await this.favsService.removeTrack(id);

    if (!isDeleted) throw new NotExistingError(Entity.Track, Action.Remove);

    return;
  }

  @Post(`${Entity.Artist}/:id`)
  async addArtist(@Param() { id }: Uuid): Promise<Artist> {
    const artist = await this.artistService.findOne(id);

    if (!artist) throw new NotExistingError(Entity.Artist, Action.Add);

    return await this.favsService.addArtist(id);
  }

  @Delete(`${Entity.Artist}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param() { id }: Uuid): Promise<void> {
    const isDeleted = await this.favsService.removeArtist(id);

    if (!isDeleted) throw new NotExistingError(Entity.Artist, Action.Remove);

    return;
  }

  @Post(`${Entity.Album}/:id`)
  async addAlbum(@Param() { id }: Uuid): Promise<Album> {
    const album = await this.albumService.findOne(id);

    if (!album) throw new NotExistingError(Entity.Album, Action.Add);

    return await this.favsService.addAlbum(id);
  }

  @Delete(`${Entity.Album}/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param() { id }: Uuid): Promise<void> {
    const isDeleted = await this.favsService.removeAlbum(id);

    if (!isDeleted) throw new NotExistingError(Entity.Album, Action.Remove);

    return;
  }

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }
}
