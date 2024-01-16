import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IgracState } from '../types/igrac.interface';
import { adapter } from '../reducers/igrac.reducers';

export const selectIgracFeature = createFeatureSelector<IgracState>('Igrac');

export const igracLoading = createSelector(
  selectIgracFeature,
  (state: IgracState) => state.isLoading
);
export const igraciSelector = createSelector(
  selectIgracFeature,
  adapter.getSelectors().selectAll
);
export const igracError = createSelector(
  selectIgracFeature,
  (state: IgracState) => state.error
);
export const igracSelector = createSelector(
  selectIgracFeature,
  (state: IgracState) => state.igrac
);

export const igraciSelectorDomaci = createSelector(
  selectIgracFeature,
  adapter.getSelectors().selectAll // Dodajte ovo
);

export const igracSelectorGostujuci = createSelector(
  selectIgracFeature,
  adapter.getSelectors().selectAll // Dodajte ovo
);
