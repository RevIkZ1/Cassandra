import { Injectable } from '@nestjs/common';
import { TimRepository } from './tim.repository';
import { Tim } from './tim.model';

@Injectable()
export class TimService {
  constructor(private timRepository: TimRepository) {}

  async createTim(tim: Tim) {
    return this.timRepository.createTim(tim);
  }

  async getTim() {
    return this.timRepository.getTim();
  }

  async getTimByLigaID(ligaID: string) {
    return this.timRepository.getTimByLigaID(ligaID);
  }
  async getTimById(timID: string) {
    return this.timRepository.getTimById(timID);
  }
}
