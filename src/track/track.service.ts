import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TrackDto } from './dto/track.dto';
import { RepositoryService } from '../repository/repository.service';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: TrackDto): Promise<Track> {
    const track = this.repositoryService.trackRepository.create(dto);

    return await this.repositoryService.trackRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.repositoryService.trackRepository.find();
  }

  async findOne(id: string): Promise<Track | undefined> {
    return await this.repositoryService.trackRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: TrackDto): Promise<Track> {
    await this.repositoryService.trackRepository.update(id, dto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repositoryService.trackRepository.delete(id);
  }
}
