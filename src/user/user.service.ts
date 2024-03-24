import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { RepositoryService } from '../repository/repository.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repositoryService.userRepository.create(dto);

    return await this.repositoryService.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repositoryService.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.repositoryService.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, newPassword: string): Promise<User> {
    await this.repositoryService.userRepository.update(id, {
      password: newPassword,
    });

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repositoryService.userRepository.delete(id);
  }
}
