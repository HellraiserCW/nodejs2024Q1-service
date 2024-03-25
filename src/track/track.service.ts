import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto, Track, UpdateTrackDto } from 'src/models';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    return tracks.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException("Track doesn't exist!");
    }
    return this.buildResponse(track);
  }

  async add(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackRepository.save(
      this.trackRepository.create(dto),
    );
    return this.buildResponse(track);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException("Track doesn't exist!");
    }
    const updatedTrack = Object.assign(track, dto);
    await this.trackRepository.save(updatedTrack);
    return this.buildResponse(updatedTrack);
  }

  async delete(id: string) {
    await this.getOneById(id);
    await this.trackRepository.delete(id);
  }

  private buildResponse(entity: TrackEntity): Track {
    return { ...entity };
  }
}
