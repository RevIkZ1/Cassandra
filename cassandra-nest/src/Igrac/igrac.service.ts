import { Injectable } from '@nestjs/common';
import { IgracRepository } from './igrac.repository';
import { Igrac } from './igrac.model';

@Injectable()
export class IgracService {
  constructor(private igracRepository: IgracRepository) {}

  async createIgrac(igrac: Igrac) {
    return this.igracRepository.createIgrac(igrac);
  }
  async getIgrac() {
    return this.igracRepository.getIgrac();
  }
  async getIgracByTim(timID: string) {
    return this.igracRepository.getIgracByTim(timID);
  }
  async deleteIgracById(timID: string) {
    return this.igracRepository.deleteIgracById(timID);
  }
}
