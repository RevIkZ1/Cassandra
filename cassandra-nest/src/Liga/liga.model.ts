import { types } from 'cassandra-driver';

export class Liga {
  liga_id: types.Uuid;
  drzava: string;
  godinaosnivanja: number;
  imelige: string;
}
