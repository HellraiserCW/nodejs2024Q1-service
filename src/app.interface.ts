import { Track } from './track/interfaces/track.interface';
import { Artist } from './artist/interfaces/artist.interface';
import { Album } from './album/interfaces/album.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
