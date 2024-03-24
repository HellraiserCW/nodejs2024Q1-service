import { Injectable } from '@nestjs/common';

import { FavoritesResponse } from './interfaces/favs.interface';
import { RepositoryService } from '../repository/repository.service';
import { NotExistingError } from '../app.errors';
import { Action, Entity } from '../app.config';

@Injectable()
export class FavsService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async findAll(): Promise<FavoritesResponse> {
    const [artists, albums, tracks] = await Promise.all([
      this.repositoryService.artistFavRepository.find({
        relations: { artist: true },
      }),
      this.repositoryService.albumFavRepository.find({
        relations: { album: true },
      }),
      this.repositoryService.trackFavRepository.find({
        relations: { track: true },
      }),
    ]);

    return {
      artists: artists.map((artistFav) => artistFav.artist),
      albums: albums.map((albumFav) => albumFav.album),
      tracks: tracks.map((trackFav) => trackFav.track),
    };
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.repositoryService.trackRepository.findOne({
      where: { id },
    });

    if (!track) throw new NotExistingError(Entity.Track, Action.Add);

    const favTrack = this.repositoryService.trackFavRepository.create({
      trackId: id,
    });

    await this.repositoryService.trackFavRepository.save(favTrack);
  }

  async removeTrack(id: string): Promise<void> {
    const track = await this.repositoryService.trackFavRepository.findOne({
      where: { trackId: id },
    });

    if (!track) throw new NotExistingError(Entity.Track, Action.Remove);

    await this.repositoryService.trackFavRepository.delete(track);
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.repositoryService.artistRepository.findOne({
      where: { id },
    });

    if (!artist) throw new NotExistingError(Entity.Artist, Action.Add);

    const favArtist = this.repositoryService.artistFavRepository.create({
      artistId: id,
    });

    await this.repositoryService.artistFavRepository.save(favArtist);
  }

  async removeArtist(id: string): Promise<void> {
    const artist = await this.repositoryService.artistFavRepository.findOne({
      where: { artistId: id },
    });

    if (!artist) throw new NotExistingError(Entity.Artist, Action.Remove);

    await this.repositoryService.artistFavRepository.delete(artist);
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.repositoryService.albumRepository.findOne({
      where: { id },
    });

    if (!album) throw new NotExistingError(Entity.Album, Action.Add);

    const favAlbum = this.repositoryService.albumFavRepository.create({
      albumId: id,
    });

    await this.repositoryService.albumFavRepository.save(favAlbum);
  }

  async removeAlbum(id: string): Promise<void> {
    const album = await this.repositoryService.albumFavRepository.findOne({
      where: { albumId: id },
    });

    if (!album) throw new NotExistingError(Entity.Album, Action.Remove);

    await this.repositoryService.albumFavRepository.delete(album);
  }
}
