import { TimService } from './tim.service';
import { TimController } from './tim.controller';
import { Module } from '@nestjs/common';
import { TimRepository } from './tim.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';

@Module({
  imports: [CassandraModule],
  controllers: [TimController],
  providers: [TimService, TimRepository],
  exports: [TimService, TimRepository],
})
export class TimModule {}
