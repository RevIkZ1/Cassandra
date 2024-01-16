import { types } from 'cassandra-driver';
import { Igrac } from 'src/Igrac/igrac.model';

export class Utakmica {
  UtakmicaID: types.Uuid;
  DomacinID: types.Uuid;
  GostujuciTimID: types.Uuid;
  StadionID: types.Uuid;
  Datum: Date;
  Golovidomacin: number;
  Golovigost: number;
  AsistencijeDomacin: string[];
  AsistencijeGosti: string[];
  CrveniKartoniDomacin: string[];
  CrveniKartoniGosti: string[];
  GoloviDomacin: string[];
  GoloviGosti: string[];
  ZutiKartoniDomacin: string[];
  ZutiKartoniGosti: string[];
}
