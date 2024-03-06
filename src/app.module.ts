import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RepositoryModule,
    TrackModule,
  ],
})
export class AppModule {}
