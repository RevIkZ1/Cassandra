import { adapter } from '../reducers/utakmica.reducers';
import { UtakmicaState } from './../types/utakmica.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selecUtakmicaFeature =
  createFeatureSelector<UtakmicaState>('Utakmica');
export const selectorUtakmicaLoading = createSelector(
  selecUtakmicaFeature,
  (state: UtakmicaState) => state.isLoading
);

export const selectorUtakmica = createSelector(
  selecUtakmicaFeature,
  adapter.getSelectors().selectAll
);
export const selectorUtakmicaError = createSelector(
  selecUtakmicaFeature,
  (state: UtakmicaState) => state.error
);

export const selectUtakmice = createSelector(
  selecUtakmicaFeature,
  (state: UtakmicaState) => adapter.getSelectors().selectAll(state)
);
