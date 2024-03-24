import { Injectable } from '@nestjs/common';

import { FavoritesResponse } from './interfaces/favs.interface';
import { RepositoryService } from '../repository/repository.service';
import { Track } from '../track/interfaces/track.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Album } from '../album/interfaces/album.interface';

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
    const favTrack = this.repositoryService.trackFavRepository.create({ trackId: id });

    await this.repositoryService.trackFavRepository.save(favTrack);
  }

  async removeTrack(track: Track): Promise<void> {
    await this.repositoryService.trackFavRepository.delete(track);
  }

  async addArtist(id: string): Promise<void> {
    const favArtist = this.repositoryService.artistFavRepository.create({ artistId: id });

    await this.repositoryService.artistFavRepository.save(favArtist);
  }

  async removeArtist(artist: Artist): Promise<void> {
    await this.repositoryService.artistFavRepository.delete(artist);
  }

  async addAlbum(id: string): Promise<void> {
    const favAlbum = this.repositoryService.albumFavRepository.create({ albumId: id });

    await this.repositoryService.albumFavRepository.save(favAlbum);
  }

  async removeAlbum(album: Album): Promise<void> {
    await this.repositoryService.albumFavRepository.delete(album);
  }
}
