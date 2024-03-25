import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto, Artist, UpdateArtistDto } from 'src/models';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<Artist[]> {
    const artists = await this.artistRepository.find();
    return artists.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException("Artist doesn't exist!");
    }
    return this.buildResponse(artist);
  }

  async add(dto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.save(
      this.artistRepository.create(dto),
    );
    return this.buildResponse(artist);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException("Artist doesn't exist!");
    }
    const updatedArtist = Object.assign(artist, dto);
    await this.artistRepository.save(updatedArtist);
    return this.buildResponse(updatedArtist);
  }

  async delete(id: string) {
    await this.getOneById(id);
    await this.artistRepository.delete(id);
  }

  private buildResponse(entity: ArtistEntity): Artist {
    return { ...entity };
  }
}
