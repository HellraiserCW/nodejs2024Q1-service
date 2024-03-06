import { Injectable } from '@nestjs/common';

import { User } from '../user/interfaces/user.interface';
import { Track } from '../track/interfaces/track.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Album } from '../album/interfaces/album.interface';
import { Favorites } from '../app.interface';

@Injectable()
export class RepositoryService {
  private users: Map<string, User> = new Map();
  private tracks: Map<string, Track> = new Map();
  private artists: Map<string, Artist> = new Map();
  private albums: Map<string, Album> = new Map();
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findOneUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async updateUser(user: User): Promise<User> {
    this.users.set(user.id, user);

    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async createTrack(track: Track): Promise<Track> {
    this.tracks.set(track.id, track);

    return track;
  }

  async findAllTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values());
  }

  async findOneTrackById(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async updateTrack(track: Track): Promise<Track> {
    this.tracks.set(track.id, track);

    return track;
  }

  async deleteTrack(id: string): Promise<boolean> {
    return this.tracks.delete(id);
  }

  async createArtist(artist: Artist): Promise<Artist> {
    this.artists.set(artist.id, artist);

    return artist;
  }

  async findAllArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async findOneArtistById(id: string): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async updateArtist(artist: Artist): Promise<Artist> {
    this.artists.set(artist.id, artist);

    return artist;
  }

  async deleteArtist(id: string): Promise<boolean> {
    return this.artists.delete(id);
  }

  async createAlbum(album: Album): Promise<Album> {
    this.albums.set(album.id, album);

    return album;
  }

  async findAllAlbums(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }

  async findOneAlbumById(id: string): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  async updateAlbum(album: Album): Promise<Album> {
    this.albums.set(album.id, album);

    return album;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    return this.albums.delete(id);
  }

  // getFavorites(): Favorites {
  //   return this.favorites;
  // }
  //
  // addToFavorites(type: keyof Favorites, id: string): void {
  //   if (this.favorites[type]) {
  //     this.favorites[type].push(id);
  //   }
  // }
  //
  // removeFromFavorites(type: keyof Favorites, id: string): void {
  //   if (this.favorites[type]) {
  //     this.favorites[type] = this.favorites[type].filter(itemId => itemId !== id);
  //   }
  // }
}
