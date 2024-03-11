import { Exclude } from 'class-transformer';

import { User } from '../interfaces/user.interface';

export class UserEntity implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    this.id = partial.id;
    this.login = partial.login;
    this.password = partial.password;
    this.version = partial.version;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
