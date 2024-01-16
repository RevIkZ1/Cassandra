import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { UtakmicaService } from './utakmica.service';
import { UtakmicaRepository } from './utakmica.repository';
import { UtakmicaController } from './utakmica.controller';
import { IgracModule } from 'src/Igrac/igrac.module';

@Module({
  imports: [CassandraModule, IgracModule],
  controllers: [UtakmicaController],
  providers: [UtakmicaService, UtakmicaRepository],
  exports: [UtakmicaService, UtakmicaRepository],
})
export class UtakmicaModule {}
