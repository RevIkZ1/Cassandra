import { Injectable } from '@nestjs/common';
import { UtakmicaRepository } from './utakmica.repository';
import { Utakmica } from './utakmica.model';
import { types } from 'cassandra-driver';

@Injectable()
export class UtakmicaService {
  constructor(private utakmicaRepository: UtakmicaRepository) {}

  async createUtakmcia(tim: Utakmica) {
    return this.utakmicaRepository.createUtakmica(tim);
  }

  async getUtakmica() {
    return this.utakmicaRepository.getUtakmica();
  }
  async updateUtakmica(
    id: string,
    DomacinGo: string,
    GostGo: string,
    DomacinCrveni: string,
    GostCrveni: string,
    DomacinZuti: string,
    GostZuti: string,
    AsistencijaDomacin: string,
    AsistencijaGost: string,
  ) {
    console.log(DomacinCrveni);
    return this.utakmicaRepository.updateUtakmica(
      id,
      DomacinGo,
      GostGo,
      DomacinCrveni,
      GostCrveni,
      DomacinZuti,
      GostZuti,
      AsistencijaDomacin,
      AsistencijaGost,
    );
  }
}
