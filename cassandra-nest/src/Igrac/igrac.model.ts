import { types } from 'cassandra-driver';

export class Igrac {
  IgracID: types.Uuid;
  TimID: types.Uuid;
  asistencije: number;
  crvenikartoni: number;
  datumrodjenja: Date;
  ime: string;
  odigranihmeceva: number;
  postignutigolovi: number;
  pozicija: string;
  prezime: string;
  zutikartoni: number;
}
