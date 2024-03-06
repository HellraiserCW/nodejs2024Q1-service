import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AlbumDto } from './dto/album.dto';
import { RepositoryService } from '../repository/repository.service';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: AlbumDto): Promise<Album> {
    return await this.repositoryService.createAlbum({
      ...dto,
      id: uuidv4(),
    });
  }

  async findAll(): Promise<Album[]> {
    return await this.repositoryService.findAllAlbums();
  }

  async findOne(id: string): Promise<Album> {
    return await this.repositoryService.findOneAlbumById(id);
  }

  async update(album: Album, dto: AlbumDto): Promise<Album> {
    return this.repositoryService.updateAlbum({
      ...album,
      ...dto,
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.repositoryService.deleteAlbum(id);
  }
}
