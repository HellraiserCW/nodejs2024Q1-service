import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { dataSource } from './orm.config';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';


@Injectable()
export class RepositoryService {
  public readonly artistRepository: Repository<ArtistEntity>;
  public readonly albumRepository: Repository<AlbumEntity>;
  public readonly trackRepository: Repository<TrackEntity>;
  public readonly artistfavRepository: Repository<ArtistFav>;
  public readonly albumfavRepository: Repository<AlbumFav>;
  public readonly trackfavRepository: Repository<TrackFav>;
  public readonly userRepository: Repository<UserEntity>;
  constructor() {
    this.artistRepository = dataSource.getRepository(ArtistEntity);
    this.albumRepository = dataSource.getRepository(AlbumEntity);
    this.trackRepository = dataSource.getRepository(TrackEntity);
    this.artistfavRepository = dataSource.getRepository(ArtistFav);
    this.albumfavRepository = dataSource.getRepository(AlbumFav);
    this.trackfavRepository = dataSource.getRepository(TrackFav);
    this.userRepository = dataSource.getRepository(UserEntity);
  }
}
