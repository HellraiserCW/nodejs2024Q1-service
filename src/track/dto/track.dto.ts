import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import { CreateTrack } from '../interfaces/track.interface';

export class TrackDto implements CreateTrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
