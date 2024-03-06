import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import { CreateAlbum } from '../interfaces/album.interface';

export class AlbumDto implements CreateAlbum {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  artistId: string | null;
}
