import { Injectable } from '@nestjs/common';
import { StadionRepository } from './stadion.repository';
import { Stadion } from './stadion.model';

@Injectable()
export class StadionService {
  constructor(private stadionRepository: StadionRepository) {}

  async createStadion(stadion: Stadion) {
    return this.stadionRepository.createStadion(stadion);
  }
  async getStadion() {
    return this.stadionRepository.getStadion();
  }
  async getStadionByTim(timID: string) {
    return this.stadionRepository.getStadionByTim(timID);
  }
}
