import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class TrackDto {
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
