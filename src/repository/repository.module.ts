import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryService } from './repository.service';
import { dataSourceOptions } from './orm.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
