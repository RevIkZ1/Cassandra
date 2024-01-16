import { Stadion } from './stadion.module';
import { Tim, TimModel } from './tim.module';

export interface Utakmica {
  UtakmicaID?: string;
  DomacinID?: string;
  GostujuciTimID?: string;
  Domacin?: TimModel; // Assuming TimModel is the type for your Tim
  Gos?: TimModel; // Assuming TimModel is the type for your Tim
  StadionID?: string;
  Datum?: Date;
  golovidomacin?: number;
  golovigost?: number;
  AsistencijeDomacin?: string[];
  AsistencijeGosti?: string[];
  CrveniKartoniDomacin?: string[];
  CrveniKartoniGosti?: string[];
  GoloviDomacin?: string[];
  GoloviGosti?: string[];
  ZutiKartoniDomacin?: string[];
  ZutiKartoniGosti?: string[];
}
export class UtakmicaModel implements Utakmica {
  UtakmicaID?: string;
  DomacinID?: string;
  GostujuciTimID?: string;
  StadionID?: string;
  Domacin?: TimModel; // Assuming TimModel is the type for your Tim
  Gos?: TimModel; // Assuming TimModel is the type for your Tim
  Datum?: Date;
  golovidomacin?: number;
  golovigost?: number;
  AsistencijeDomacin?: string[];
  AsistencijeGosti?: string[];
  CrveniKartoniDomacin?: string[];
  CrveniKartoniGosti?: string[];
  GoloviDomacin?: string[];
  GoloviGosti?: string[];
  ZutiKartoniDomacin?: string[];
  ZutiKartoniGosti?: string[];

  constructor(
    UtakmicaID?: string,
    DomacinID?: string,
    GostujuciTimID?: string,
    StadionID?: string,
    Datum?: Date,
    golovidomacin?: number,
    golovigost?: number,
    Domacin?: TimModel,
    Gos?: TimModel,
    AsistencijeDomacin?: string[],
    AsistencijeGosti?: string[],
    CrveniKartoniDomacin?: string[],
    CrveniKartoniGosti?: string[],
    GoloviDomacin?: string[],
    GoloviGosti?: string[],
    ZutiKartoniDomacin?: string[],
    ZutiKartoniGosti?: string[]
  ) {
    this.UtakmicaID = UtakmicaID;
    this.DomacinID = DomacinID;
    this.GostujuciTimID = GostujuciTimID;
    this.StadionID = StadionID;
    this.Datum = Datum;
    this.golovidomacin = golovidomacin;
    this.golovigost = golovigost;
    this.AsistencijeDomacin = AsistencijeDomacin;
    this.AsistencijeGosti = AsistencijeGosti;
    this.CrveniKartoniDomacin = CrveniKartoniDomacin;
    this.CrveniKartoniGosti = CrveniKartoniGosti;
    this.GoloviDomacin = GoloviDomacin;
    this.GoloviGosti = GoloviGosti;
    this.ZutiKartoniDomacin = ZutiKartoniDomacin;
    this.ZutiKartoniGosti = ZutiKartoniGosti;
    this.Domacin = Domacin;
    this.Gos = Gos;
  }
}
