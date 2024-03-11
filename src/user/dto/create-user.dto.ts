import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUser } from '../interfaces/user.interface';

export class CreateUserDto implements CreateUser {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
