import { Injectable } from '@nestjs/common';

import { User } from '../user/interfaces/user.interface';
import { Track } from '../track/interfaces/track.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Album } from '../album/interfaces/album.interface';
import { Favorites } from '../favs/interfaces/favs.interface';

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
    const isDeleted = this.tracks.delete(id);
    if (isDeleted) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }

    return isDeleted;
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
    const isDeleted = this.artists.delete(id);

    if (isDeleted) {
      for (const album of this.albums.values()) {
        if (album.artistId === id) {
          album.artistId = null;
          this.albums.set(album.id, album);
        }
      }

      for (const track of this.tracks.values()) {
        if (track.artistId === id) {
          track.artistId = null;
          this.tracks.set(track.id, track);
        }
      }

      this.favorites.artists = this.favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    }

    return isDeleted;
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
    const isDeleted = this.albums.delete(id);

    if (isDeleted) {
      for (const track of this.tracks.values()) {
        if (track.albumId === id) {
          track.albumId = null;
          this.tracks.set(track.id, track);
        }
      }

      this.favorites.albums = this.favorites.albums.filter(
        (albumId) => albumId !== id,
      );
    }

    return isDeleted;
  }

  async findFavTracks(): Promise<Track[]> {
    return this.favorites.tracks
      .map((trackId) => this.tracks.get(trackId))
      .filter((track) => !!track);
  }

  async addTrackToFav(id: string): Promise<Track> {
    this.favorites.tracks.push(id);

    return this.findOneTrackById(id);
  }

  async removeTrackFromFav(id: string): Promise<boolean> {
    const index = this.favorites.tracks.indexOf(id);

    return index !== -1 ? !!this.favorites.tracks.splice(index, 1) : false;
  }

  async findFavArtists(): Promise<Artist[]> {
    return this.favorites.artists
      .map((artistId) => this.artists.get(artistId))
      .filter((artist) => !!artist);
  }

  async addArtistToFav(id: string): Promise<Artist> {
    this.favorites.artists.push(id);

    return this.findOneArtistById(id);
  }

  async removeArtistFromFav(id: string): Promise<boolean> {
    const index = this.favorites.artists.indexOf(id);

    return index !== -1 ? !!this.favorites.artists.splice(index, 1) : false;
  }

  async findFavAlbums(): Promise<Album[]> {
    return this.favorites.albums
      .map((albumId) => this.albums.get(albumId))
      .filter((album) => !!album);
  }

  async addAlbumToFav(id: string): Promise<Album> {
    this.favorites.albums.push(id);

    return this.findOneAlbumById(id);
  }

  async removeAlbumFromFav(id: string): Promise<boolean> {
    const index = this.favorites.albums.indexOf(id);

    return index !== -1 ? !!this.favorites.albums.splice(index, 1) : false;
  }
}
