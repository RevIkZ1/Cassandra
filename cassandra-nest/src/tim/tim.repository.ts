import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { Tim } from './tim.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
@Injectable()
export class TimRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  timMapper: mapping.ModelMapper<Tim>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Tim: {
          tables: ['tim'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.timMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('tim');
  }

  async getTim() {
    return (await this.timMapper.findAll()).toArray();
  }

  async createTim(tim: Tim) {
    tim.TimID = types.Uuid.random();
    tim.LigaID = tim.LigaID;
    return (await this.timMapper.insert(tim)).toArray();
  }

  async getTimByLigaID(LigaID: string) {
    console.log(LigaID);
    const query = 'SELECT * FROM tim WHERE "LigaID" = ? ALLOW FILTERING';
    const params = [types.Uuid.fromString(LigaID)];

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });
    const timoviZaLigu = result.rows;

    console.log(LigaID);
    return timoviZaLigu;
  }
  async getTimById(TimID: string) {
    console.log(TimID);
    const query = 'SELECT * FROM tim WHERE "TimID" = ? ';
    const params = [types.Uuid.fromString(TimID)];

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });
    const timoviZaLigu = result.rows;

    console.log(TimID);
    return timoviZaLigu;
  }
}
