import { IsNotEmpty, IsString } from 'class-validator';

import { UpdatePassword } from '../interfaces/user.interface';

export class UpdateUserPasswordDto implements UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
