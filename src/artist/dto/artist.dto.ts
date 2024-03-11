import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { CreateTrack } from '../interfaces/artist.interface';

export class ArtistDto implements CreateTrack {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
