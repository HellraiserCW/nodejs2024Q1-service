import { Injectable } from '@nestjs/common';

import { User } from '../user/interfaces/user.interface';
import { Album, Artist, Favorites, Track } from '../app.interfaces';

@Injectable()
export class RepositoryService {
  private users: Map<string, User> = new Map();
  private artists: Map<string, Artist> = new Map();
  private tracks: Map<string, Track> = new Map();
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

  async findAllUsers(): Promise<Map<string, User>> {
    return this.users;
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

  // createArtist(artist: Artist): Artist {
  //   const id = uuidv4();
  //   const newArtist = { ...artist, id };
  //   this.artists.set(id, newArtist);
  //   return newArtist;
  // }

  // Implement similar methods for other entities (Artist, Track, Album)

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
