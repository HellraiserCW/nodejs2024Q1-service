import { Injectable } from '@nestjs/common';

import { AlbumDto } from './dto/album.dto';
import { RepositoryService } from '../repository/repository.service';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: AlbumDto): Promise<Album> {
    const album = this.repositoryService.albumRepository.create(dto);

    return await this.repositoryService.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.repositoryService.albumRepository.find();
  }

  async findOne(id: string): Promise<Album | undefined> {
    return await this.repositoryService.albumRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: AlbumDto): Promise<Album> {
    await this.repositoryService.albumRepository.update(id, dto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repositoryService.albumRepository.delete(id);
  }
}
