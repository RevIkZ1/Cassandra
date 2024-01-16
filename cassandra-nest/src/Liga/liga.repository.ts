import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { Liga } from './liga.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class LigaRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  ligaMapper: mapping.ModelMapper<Liga>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Liga: {
          tables: ['liga'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.ligaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('liga');
  }
  async getLiga() {
    return (await this.ligaMapper.findAll()).toArray();
  }

  async createLiga(liga: Liga) {
    liga.liga_id = types.Uuid.random();
    return (await this.ligaMapper.insert(liga)).toArray();
  }
}
