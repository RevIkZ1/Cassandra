import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { IgracService } from './igrac.service';
import { IgracRepository } from './igrac.repository';
import { IgracController } from './igrac.controller';

@Module({
  imports: [CassandraModule],
  controllers: [IgracController],
  providers: [IgracService, IgracRepository],
  exports: [IgracService, IgracRepository],
})
export class IgracModule {}
