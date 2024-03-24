import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistFav } from './entities/artistFav.entity';
import { AlbumFav } from './entities/albumFav.entity';
import { TrackFav } from './entities/trackFav.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumFav, ArtistFav, TrackFav])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
