import { types } from 'cassandra-driver';

export class Stadion {
  StadionID: types.Uuid;
  TimID: types.Uuid;
  grad: string;
  imestadiona: string;
  kapacitet: number;
}
