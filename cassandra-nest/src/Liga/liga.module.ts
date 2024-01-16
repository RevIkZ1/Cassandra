import { LigaService } from './liga.service';
import { LigaController } from './liga.controller';
import { Module } from '@nestjs/common';
import { LigaRepository } from './liga.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';

@Module({
  imports: [CassandraModule],
  controllers: [LigaController],
  providers: [LigaService, LigaRepository],
  exports: [LigaService, LigaRepository],
})
export class LigaModule {}
