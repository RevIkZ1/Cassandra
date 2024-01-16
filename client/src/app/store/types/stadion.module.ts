import { Tim } from './tim.module';

export interface Stadion {
  StadionID: string;
  TimID: Tim;
  grad: string;
  imestadiona: string;
  kapacitet: number;
}
export class StadionModel implements Stadion {
  StadionID: string;
  TimID: Tim;
  grad: string;
  imestadiona: string;
  kapacitet: number;

  constructor(
    StadionID: string,
    TimID: Tim,
    grad: string,
    imestadiona: string,
    kapacitet: number
  ) {
    this.StadionID = StadionID;
    this.TimID = TimID;
    this.grad = grad;
    this.imestadiona = imestadiona;
    this.kapacitet = kapacitet;
  }
}
