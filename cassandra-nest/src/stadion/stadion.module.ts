import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { StadionService } from './stadion.service';
import { StadionRepository } from './stadion.repository';
import { StadionController } from './stadion.controller';

@Module({
  imports: [CassandraModule],
  controllers: [StadionController],
  providers: [StadionService, StadionRepository],
  exports: [StadionService, StadionRepository],
})
export class StadionModule {}
