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
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: Uuid): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(id);

      if (!user) throw new NotFoundError(Entity.User);

      return user;
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

      return await this.userService.update(id, newPassword);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: Uuid): Promise<void> {
    try {
      const isUser = await this.userService.findOne(id);

      if (!isUser) throw new NotFoundError(Entity.User);

      return await this.userService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
