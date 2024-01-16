import { Tim } from './tim.module';

export interface Igrac {
  IgracID?: string;
  TimID?: Tim;
  asistencije?: number;
  crvenikartoni?: number;
  datumrodjenja?: Date;
  ime?: string;
  odigranihmeceva?: number;
  postignutigolovi?: number;
  pozicija?: string;
  prezime?: string;
  zutikartoni?: number;
}
export class IgracModel implements Igrac {
  IgracID?: string;
  TimID?: Tim;
  asistencije?: number;
  crvenikartoni?: number;
  datumrodjenja?: Date;
  ime?: string;
  odigranihmeceva?: number;
  postignutigolovi?: number;
  pozicija?: string;
  prezime?: string;
  zutikartoni?: number;

  constructor(
    IgracID?: string,
    TimID?: Tim,
    asistencije?: number,
    crvenikartoni?: number,
    datumrodjenja?: Date,
    ime?: string,
    odigranihmeceva?: number,
    postignutigolovi?: number,
    pozicija?: string,
    prezime?: string,
    zutikartoni?: number
  ) {
    this.IgracID = IgracID;
    this.TimID = TimID;
    this.asistencije = asistencije;
    this.crvenikartoni = crvenikartoni;
    this.datumrodjenja = datumrodjenja;
    this.ime = ime;
    this.odigranihmeceva = odigranihmeceva;
    this.postignutigolovi = postignutigolovi;
    this.pozicija = pozicija;
    this.prezime = prezime;
    this.zutikartoni = zutikartoni;
  }
}
