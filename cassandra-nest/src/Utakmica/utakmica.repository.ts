import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, mapping, types } from 'cassandra-driver';
import { Utakmica } from './utakmica.model';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { IgracRepository } from 'src/Igrac/igrac.repository';

@Injectable()
export class UtakmicaRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private igracRepository: IgracRepository,
  ) {}

  utakmicaMapper: mapping.ModelMapper<Utakmica>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Utakmica: {
          tables: ['utakmica'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.utakmicaMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('utakmica');
  }
  async getUtakmica() {
    return (await this.utakmicaMapper.findAll()).toArray();
  }

  async createUtakmica(utakmica: Utakmica) {
    utakmica.UtakmicaID = types.Uuid.random();

    // Update player statistics for home team players
    await this.updatePlayerStatistics(
      utakmica.GoloviDomacin,
      'postignutigolovi',
    );
    await this.updatePlayerStatistics(
      utakmica.AsistencijeDomacin,
      'asistencije',
    );
    await this.updatePlayerStatistics(
      utakmica.CrveniKartoniDomacin,
      'crvenikartoni',
    );
    await this.updatePlayerStatistics(
      utakmica.ZutiKartoniDomacin,
      'zutikartoni',
    );

    // Update player statistics for away team players
    await this.updatePlayerStatistics(utakmica.GoloviGosti, 'postignutigolovi');
    await this.updatePlayerStatistics(utakmica.AsistencijeGosti, 'asistencije');
    await this.updatePlayerStatistics(
      utakmica.CrveniKartoniGosti,
      'crvenikartoni',
    );
    await this.updatePlayerStatistics(utakmica.ZutiKartoniGosti, 'zutikartoni');

    // Insert the updated utakmica object into the database
    const result = await this.utakmicaMapper.insert(utakmica);
    console.log('Rezultat inserta u bazu:', result);

    // Return the updated utakmica object or any other relevant data
    return result.toArray();
  }
  async updatePlayerStatistics(playerIds: string[], statisticField: string) {
    if (!playerIds || playerIds.length === 0) {
      return; // Return early if playerIds is undefined, null, or an empty array
    }

    const playerCounts: { [key: string]: number } = {};

    // Count occurrences of each player ID
    playerIds.forEach((playerId) => {
      playerCounts[playerId] = (playerCounts[playerId] || 0) + 1;
    });

    // Fetch each unique player and update the statisticField based on the count
    const uniquePlayerIds = Object.keys(playerCounts);

    await Promise.all(
      uniquePlayerIds.map(async (playerId) => {
        const count = playerCounts[playerId];
        const player = await this.igracRepository.getPlayerById(playerId);

        if (player) {
          player[statisticField] += count;
          await this.igracRepository.updateIgrac(player);
        }
      }),
    );
  }
  async updateUtakmica(
    UtakmicaID: string,
    DomacinGo: string,
    GostGo: string,
    DomacinCrveni: string,
    GostCrveni: string,
    DomacinZuti: string,
    GostZuti: string,
    AsistencijaDomacin: string,
    AsistencijaGost: string,
  ) {
    const updateFields = [];
    const params = [UtakmicaID];

    const addCondition = (columnName: string, value: string) => {
      if (value !== '') {
        updateFields.push(`"${columnName}" = "${columnName}" + ['${value}']`);
      }
    };

    addCondition('AsistencijeDomaci', AsistencijaDomacin);
    addCondition('AsistencijeGosti', AsistencijaGost);
    addCondition('CrveniKartoniDomaci', DomacinCrveni);
    addCondition('CrveniKartoniGosti', GostCrveni);
    addCondition('GoloviDomacin', DomacinGo);
    addCondition('GoloviGosti', GostGo);
    addCondition('ZutiKartoniDomaci', DomacinZuti);
    addCondition('ZutiKartoniGosti', GostZuti);

    const query = `
      UPDATE utakmica
      SET ${updateFields.join(', ')}
      WHERE "UtakmicaID" = ?;
    `;

    const result = await this.cassandraService.execute(query, params, {
      prepare: true,
    });
    console.log('nesto');

    if (DomacinGo != '')
      await this.updatePlayerStatistics([DomacinGo], 'postignutigolovi');
    else if (GostGo != '') {
      await this.updatePlayerStatistics([GostGo], 'postignutigolovi');
    }
    console.log('nesto');
    if (AsistencijaDomacin != '' || AsistencijaGost != '')
      await this.updatePlayerStatistics(
        [AsistencijaDomacin, AsistencijaGost],
        'asistencije',
      );
    console.log('nesto');

    if (DomacinCrveni != '' || GostCrveni != '')
      await this.updatePlayerStatistics(
        [DomacinCrveni, GostCrveni],
        'crvenikartoni',
      );
    console.log('nesto');

    if (DomacinZuti != '' || GostZuti != '')
      await this.updatePlayerStatistics([DomacinZuti, GostZuti], 'zutikartoni');

    return result;
  }
  async updatePlayerStatistic(playerIds: string, statisticField: string) {
    if (!playerIds || playerIds.length === 0) {
      return; // Return early if playerIds is undefined, null, or an empty array
    }

    const playerCounts: { [key: string]: number } = {};

    // Count occurrences of each player ID
    playerCounts[playerIds] = (playerCounts[playerIds] || 0) + 1;

    // Fetch each unique player and update the statisticField based on the count
    const uniquePlayerIds = Object.keys(playerCounts);

    await Promise.all(
      uniquePlayerIds.map(async (playerId) => {
        const count = playerCounts[playerId];
        const player = await this.igracRepository.getPlayerById(playerId);

        if (player) {
          player[statisticField] += count;
          await this.igracRepository.updateIgrac(player);
        }
      }),
    );
  }
}
