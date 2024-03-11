import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ArtistDto } from './dto/artist.dto';
import { RepositoryService } from '../repository/repository.service';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: ArtistDto): Promise<Artist> {
    return await this.repositoryService.createArtist({
      ...dto,
      id: uuidv4(),
    });
  }

  async findAll(): Promise<Artist[]> {
    return await this.repositoryService.findAllArtists();
  }

  async findOne(id: string): Promise<Artist | undefined> {
    return await this.repositoryService.findOneArtistById(id);
  }

  async update(artist: Artist, dto: ArtistDto): Promise<Artist> {
    return this.repositoryService.updateArtist({
      ...artist,
      ...dto,
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.repositoryService.deleteArtist(id);
  }
}
