import { Liga } from './liga.module';

export interface Tim {
  TimID?: string;
  LigaID?: Liga;
  datumosnivanja?: Date;
  imetima?: string;
  trener?: string;
}
export class TimModel implements Tim {
  TimID?: string;
  LigaID?: Liga;
  datumosnivanja?: Date;
  imetima?: string;
  trener?: string;

  constructor(
    TimID?: string,
    LigaID?: Liga,
    datumosnivanja?: Date,
    imetima?: string,
    trener?: string
  ) {
    this.TimID = TimID;
    this.LigaID = LigaID;
    this.datumosnivanja = datumosnivanja;
    this.imetima = imetima;

    this.trener = trener;
  }
}
