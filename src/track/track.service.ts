import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TrackDto } from './dto/track.dto';
import { RepositoryService } from '../repository/repository.service';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: TrackDto): Promise<Track> {
    const id = uuidv4();

    return await this.repositoryService.createTrack({
      ...dto,
      id,
    });
  }

  async findAll(): Promise<Track[]> {
    return await this.repositoryService.findAllTracks();
  }

  async findOne(id: string): Promise<Track | undefined> {
    return await this.repositoryService.findOneTrackById(id);
  }

  async update(track: Track, dto: TrackDto): Promise<Track> {
    return this.repositoryService.updateTrack({
      ...track,
      ...dto,
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.repositoryService.deleteTrack(id);
  }
}
