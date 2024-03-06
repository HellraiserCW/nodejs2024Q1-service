import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { RepositoryService } from '../repository/repository.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const id = uuidv4();
    const createdAt = Date.now();

    return await this.repositoryService.createUser({
      ...dto,
      id,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    });
  }

  async findAll(): Promise<Map<string, User>> {
    return await this.repositoryService.findAllUsers();
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.repositoryService.findOneUserById(id);
  }

  async update(user: User, password: string): Promise<User> {
    return this.repositoryService.updateUser({
      ...user,
      password,
      version: ++user.version,
      updatedAt: Date.now(),
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.repositoryService.deleteUser(id);
  }
}
