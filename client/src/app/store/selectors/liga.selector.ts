import { adapter } from '../reducers/liga.reducers';
import { LigaState } from './../types/liga.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selecLigaFeature = createFeatureSelector<LigaState>('Liga');
export const selectorLigeLoading = createSelector(
  selecLigaFeature,
  (state: LigaState) => state.isLoading
);

export const selectorLige = createSelector(
  selecLigaFeature,
  adapter.getSelectors().selectAll
);
export const selectorLigeError = createSelector(
  selecLigaFeature,
  (state: LigaState) => state.error
);
