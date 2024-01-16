import { Injectable } from '@nestjs/common';
import { LigaRepository } from './liga.repository';
import { Liga } from './liga.model';

@Injectable()
export class LigaService {
  constructor(private ligaRepository: LigaRepository) {}

  async createEmployee(liga: Liga) {
    return this.ligaRepository.createLiga(liga);
  }
  async getLiga() {
    return this.ligaRepository.getLiga();
  }
}
