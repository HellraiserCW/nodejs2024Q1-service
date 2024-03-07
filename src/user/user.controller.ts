import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entities/user.entity';
import { NotFoundError, WrongPasswordError } from '../app.errors';
import { Uuid } from '../app.validators';
import { Entity } from '../app.config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userService.create(createUserDto);

      return new UserEntity(user);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userService.findAll();

      return users.map((user) => new UserEntity(user));
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: Uuid): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(id);

      if (!user) throw new NotFoundError(Entity.User);

      return new UserEntity(user);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: Uuid,
    @Body() { oldPassword, newPassword }: UpdateUserPasswordDto,
  ): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(id);

      if (!user) throw new NotFoundError(Entity.User);

      if (oldPassword !== user.password) throw new WrongPasswordError();

      const updatedUser = await this.userService.update(user, newPassword);

      return new UserEntity(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isDeleted = await this.userService.remove(id);

      if (!isDeleted) throw new NotFoundError(Entity.User);

      return;
    } catch (error) {
      throw error;
    }
  }
}
