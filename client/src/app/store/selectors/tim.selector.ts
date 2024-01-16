import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimState } from '../types/tim.interface';
import { adapter } from '../reducers/tim.reducers';

export const selectTimFeature = createFeatureSelector<TimState>('Tim');

export const timLoading = createSelector(
  selectTimFeature,
  (state: TimState) => state.isLoading
);
export const timoviSelector = createSelector(
  selectTimFeature,
  adapter.getSelectors().selectAll
);
export const timError = createSelector(
  selectTimFeature,
  (state: TimState) => state.error
);
export const timSelector = createSelector(
  selectTimFeature,
  (state: TimState) => state.tim
);
