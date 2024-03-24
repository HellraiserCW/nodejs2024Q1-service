import { Injectable } from '@nestjs/common';

import { ArtistDto } from './dto/artist.dto';
import { RepositoryService } from '../repository/repository.service';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: ArtistDto): Promise<Artist> {
    const artist = this.repositoryService.artistRepository.create(dto);

    return await this.repositoryService.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.repositoryService.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist | null> {
    return await this.repositoryService.artistRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: ArtistDto): Promise<Artist> {
    await this.repositoryService.artistRepository.update(id, dto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repositoryService.artistRepository.delete(id);
  }
}
