import { createAction, props } from '@ngrx/store';
import { StadionModel } from '../types/stadion.module';
export const getStadion = createAction(
  '[Stadion page] get Stadion',
  props<{ id: number }>()
);
export const getStadionSuccess = createAction(
  '[Stadion/API] Get Stadion Success',
  props<{ mesta: StadionModel[] }>()
);
export const getIStadionFailure = createAction(
  '[Stadion page] Get Stadion Failure',
  props<{ error: string }>()
);
export const postStadion = createAction(
  '[Stadion page] Post Stadion',
  props<{
    stadion: StadionModel;
    id: string;
  }>()
);

export const postStadionSuccess = createAction(
  '[Stadion page] Post Stadion Success',
  props<{
    stadion: StadionModel;
  }>()
);

export const postStadionFailure = createAction(
  '[Stadion page] Post Stadion Failure',
  props<{ error: string }>()
);
