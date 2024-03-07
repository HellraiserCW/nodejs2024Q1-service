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
      this.repositoryService.findFavArtists(),
      this.repositoryService.findFavAlbums(),
      this.repositoryService.findFavTracks(),
    ]);

    return { artists, albums, tracks };
  }

  async addTrack(id: string): Promise<Track> {
    return this.repositoryService.addTrackToFav(id);
  }

  async removeTrack(id: string): Promise<boolean> {
    return this.repositoryService.removeTrackFromFav(id);
  }

  async addArtist(id: string): Promise<Artist> {
    return this.repositoryService.addArtistToFav(id);
  }

  async removeArtist(id: string): Promise<boolean> {
    return this.repositoryService.removeArtistFromFav(id);
  }

  async addAlbum(id: string): Promise<Album> {
    return this.repositoryService.addAlbumToFav(id);
  }

  async removeAlbum(id: string): Promise<boolean> {
    return this.repositoryService.removeAlbumFromFav(id);
  }
}
