import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { Stadion } from './stadion.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class StadionRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  ligaMapper: mapping.ModelMapper<Stadion>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Liga: {
          tables: ['stadion'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.ligaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('stadion');
  }
  async getStadion() {
    return (await this.ligaMapper.findAll()).toArray();
  }

  async createStadion(stadion: Stadion) {
    stadion.StadionID = types.Uuid.random();
    return (await this.ligaMapper.insert(stadion)).toArray();
  }
  async getStadionByTim(TimID: string) {
    console.log(TimID);
    const query = 'SELECT * FROM stadion WHERE "TimID" = ? ALLOW FILTERING';
    const params = [types.Uuid.fromString(TimID)];

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });
    const igracZaTim = result.rows;

    console.log(TimID);
    return igracZaTim;
  }
}
