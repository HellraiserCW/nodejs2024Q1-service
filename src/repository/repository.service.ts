import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { dataSource } from './orm.config';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { TrackFav } from '../favs/entities/trackFav.entity';
import { ArtistFav } from '../favs/entities/artistFav.entity';
import { AlbumFav } from '../favs/entities/albumFav.entity';

@Injectable()
export class RepositoryService {
  public readonly artistRepository: Repository<ArtistEntity>;
  public readonly albumRepository: Repository<AlbumEntity>;
  public readonly trackRepository: Repository<TrackEntity>;
  public readonly artistFavRepository: Repository<ArtistFav>;
  public readonly albumFavRepository: Repository<AlbumFav>;
  public readonly trackFavRepository: Repository<TrackFav>;
  public readonly userRepository: Repository<UserEntity>;
  constructor() {
    this.artistRepository = dataSource.getRepository(ArtistEntity);
    this.albumRepository = dataSource.getRepository(AlbumEntity);
    this.trackRepository = dataSource.getRepository(TrackEntity);
    this.artistFavRepository = dataSource.getRepository(ArtistFav);
    this.albumFavRepository = dataSource.getRepository(AlbumFav);
    this.trackFavRepository = dataSource.getRepository(TrackFav);
    this.userRepository = dataSource.getRepository(UserEntity);
  }
}
