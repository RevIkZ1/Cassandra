import { createAction, props } from '@ngrx/store';
import { TimModel } from '../types/tim.module';
export const getTimovi = createAction(
  '[Tim page] Get Timovi', // Renamed for clarity
  props<{ id: number }>()
);

export const getTimoviSuccess = createAction(
  '[Tim/API] Get Timovi Success',
  props<{ mesta: TimModel[] }>()
);

export const getTimoviFailure = createAction(
  '[Tim page] Get Timovi Failure',
  props<{ error: string }>()
);

// ...

export const getTim = createAction(
  '[Tim page] Get Tim',
  props<{ id: string }>()
);

export const getTimSuccess = createAction(
  '[Tim/API] Get Tim Success',
  props<{ mesta: TimModel[] }>()
);

export const getTimFailure = createAction(
  '[Tim page] Get Tim Failure',
  props<{ error: string }>()
);
export const postTIm = createAction(
  '[TIm page] Post TIm',
  props<{
    tim: TimModel;
    id: string;
  }>()
);

export const postTImSuccess = createAction(
  '[TIm page] Post TIm Success',
  props<{
    tim: TimModel;
  }>()
);

export const postTImFailure = createAction(
  '[TIm  page] Post TIm Failure',
  props<{ error: string }>()
);
export const getTimByUser = createAction(
  '[Tim page] Get Tim',
  props<{ id: string }>()
);

export const getTimByUserSuccess = createAction(
  '[Tim/API] Get Tim Success',
  props<{ mesta: TimModel[] }>()
);

export const getTimByUserFailure = createAction(
  '[Tim page] Get Tim Failure',
  props<{ error: string }>()
);
