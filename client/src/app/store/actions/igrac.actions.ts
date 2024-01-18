import { createAction, props } from '@ngrx/store';
import { IgracModel } from '../types/igrac.module';
export const getIgrac = createAction(
  '[Igrac page] get Igrac',
  props<{ id: number }>()
);
export const getIgracSuccess = createAction(
  '[Igrac/API] Get Igrac Success',
  props<{ mesta: IgracModel[] }>()
);
export const getIgracFailure = createAction(
  '[Igrac page] Get Igrac Failure',
  props<{ error: string }>()
);
export const postIgrac = createAction(
  '[Igrac page] Post Igrac',
  props<{
    igrac: IgracModel;
    id: string;
  }>()
);

export const postIgracSuccess = createAction(
  '[Igrac page] Post Igrac Success',
  props<{
    igrac: IgracModel;
  }>()
);

export const postIgracFailure = createAction(
  '[Igrac  page] Post Igrac Failure',
  props<{ error: string }>()
);
export const deleteIgrac = createAction(
  '[Igrac Page] Delete Igrac',
  props<{ id: string }>()
);
export const deleteIgracSuccess = createAction(
  '[Igrac Page] Delete Igrac Success',
  props<{ id: string }>()
);
export const deleteIgracFailure = createAction(
  '[Igrac Page] Delete Igrac Failure',
  props<{ error: string }>()
);
