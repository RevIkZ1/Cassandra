import { createAction, props } from '@ngrx/store';
import { UtakmicaModel } from '../types/utakmica.module';
export const getUtakmice = createAction('[Utakmice Page] Get Utakmice');

export const getUtakmiceSuccess = createAction(
  '[Utakmice API] Get Utakmice Success',
  props<{ utakmice: UtakmicaModel[] }>()
);
export const getUtakmiceFailure = createAction(
  '[Utakmice API] Utakmice Failure',
  props<{ error: string }>()
);
export const postUtakmica = createAction(
  '[Igrac page] Post Igrac',
  props<{
    utakmica: UtakmicaModel;
  }>()
);

export const postUtakmicaSuccess = createAction(
  '[Igrac page] Post Igrac Success',
  props<{
    utakmica: UtakmicaModel;
  }>()
);

export const postUtakmicaFailure = createAction(
  '[Igrac  page] Post Igrac Failure',
  props<{ error: string }>()
);
export const putUtakmica = createAction(
  '[Igrac page] Post Igrac',
  props<{
    id: string;
    DomacinGo: string;
    GostGo: string;
    DomacinCrveni: string;
    GostCrveni: string;
    DomacinZuti: string;
    GostZuti: string;
    AsistencijaDomacin: string;
    AsistencijaGost: string;
  }>()
);

export const putUtakmicaSuccess = createAction(
  '[Igrac page] Post Igrac Success',
  props<{
    id: string;
    DomacinGo: string;
    GostGo: string;
    DomacinCrveni: string;
    GostCrveni: string;
    DomacinZuti: string;
    GostZuti: string;
    AsistencijaDomacin: string;
    AsistencijaGost: string;
  }>()
);

export const putUtakmicaFailure = createAction(
  '[Igrac  page] Post Igrac Failure',
  props<{ error: string }>()
);
