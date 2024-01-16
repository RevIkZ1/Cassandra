import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { Igrac } from './igrac.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Injectable()
export class IgracRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  igracMapper: mapping.ModelMapper<Igrac>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Igrac: {
          tables: ['igrac'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.igracMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('igrac');
  }
  async getIgrac() {
    return (await this.igracMapper.findAll()).toArray();
  }

  async createIgrac(igrac: Igrac) {
    igrac.IgracID = types.Uuid.random();
    return (await this.igracMapper.insert(igrac)).toArray();
  }
  async getIgracByTim(TimID: string) {
    console.log(TimID);
    const query = 'SELECT * FROM igrac WHERE "TimID" = ? ALLOW FILTERING';
    const params = [types.Uuid.fromString(TimID)];

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });
    const igracZaTim = result.rows;

    console.log(TimID);
    return igracZaTim;
  }
  async updateIgrac(igrac: Igrac): Promise<any> {
    try {
      const result = await this.igracMapper.update(igrac);
      console.log('Update result:', result);
      return result;
    } catch (error) {
      console.error('Error during update:', error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  }

  async getPlayerById(playerId: string): Promise<Igrac | null> {
    const params = [types.Uuid.fromString(playerId)];
    const query = 'SELECT * FROM igrac WHERE "IgracID" = ?';

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });

    if (result.rows.length > 0) {
      const player = result.rows[0];
      return {
        IgracID: player.IgracID,
        TimID: player.TimID,
        asistencije: player.asistencije,
        crvenikartoni: player.crvenikartoni,
        datumrodjenja: player.datumrodjenja,
        ime: player.ime,
        odigranihmeceva: player.odigranihmeceva,
        postignutigolovi: player.postignutigolovi,
        pozicija: player.pozicija,
        prezime: player.prezime,
        zutikartoni: player.zutikartoni,
      };
    }

    return null;
  }
}
