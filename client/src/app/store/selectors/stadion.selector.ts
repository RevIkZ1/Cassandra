import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IgracState } from '../types/igrac.interface';
import { adapter } from '../reducers/stadion.reducers';
import { StadionState } from '../types/stadion.interface';

export const selectStadionFeature =
  createFeatureSelector<StadionState>('Stadion');

export const stadionLoading = createSelector(
  selectStadionFeature,
  (state: StadionState) => state.isLoading
);
export const stadioniSelector = createSelector(
  selectStadionFeature,
  adapter.getSelectors().selectAll
);
export const stadionError = createSelector(
  selectStadionFeature,
  (state: StadionState) => state.error
);
export const stadionSelector = createSelector(
  selectStadionFeature,
  (state: StadionState) => state.stadion
);
