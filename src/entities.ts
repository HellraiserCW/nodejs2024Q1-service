import { AlbumEntity } from './album/album.entity';
import { ArtistEntity } from './artist/artist.entity';
import { FavoritesEntity } from './favorites/favorites.entity';
import { TrackEntity } from './track/track.entity';
import { UserEntity } from './user/user.entity';

export const entities = [
  UserEntity,
  TrackEntity,
  AlbumEntity,
  ArtistEntity,
  FavoritesEntity,
];
