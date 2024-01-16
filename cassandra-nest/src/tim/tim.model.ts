import { types } from 'cassandra-driver';

export class Tim {
  TimID: types.Uuid;
  LigaID: types.Uuid;
  datumosnivanja: Date;
  imetima: string;
  trener: string;
}
