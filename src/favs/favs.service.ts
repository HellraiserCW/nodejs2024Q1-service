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
      this.repositoryService.findAllArtists(),
      this.repositoryService.findAllAlbums(),
      this.repositoryService.findAllTracks(),
    ]);

    return { artists, albums, tracks };
  }

  async addTrack(id: string): Promise<Track> {
    return this.repositoryService.addTrack(id);
  }

  async removeTrack(id: string): Promise<boolean> {
    return this.repositoryService.removeTrack(id);
  }

  async addArtist(id: string): Promise<Artist> {
    return this.repositoryService.addArtist(id);
  }

  async removeArtist(id: string): Promise<boolean> {
    return this.repositoryService.removeArtist(id);
  }

  async addAlbum(id: string): Promise<Album> {
    return this.repositoryService.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<boolean> {
    return this.repositoryService.removeAlbum(id);
  }
}
