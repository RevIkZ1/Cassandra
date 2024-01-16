export interface Liga {
  liga_id: string;
  drzava: string;
  godinaosnivanja: number;
  imelige: string;
}
export class LigaModel implements Liga {
  liga_id: string;
  drzava: string;
  godinaosnivanja: number;
  imelige: string;

  constructor(
    liga_id: string,
    drzava: string,
    godinaosnivanja: number,
    imelige: string
  ) {
    this.liga_id = liga_id;
    this.drzava = drzava;
    this.godinaosnivanja = godinaosnivanja;
    this.imelige = imelige;
  }
}
