import { Liga, LigaModel } from '../types/liga.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as StadionActions from '../actions/stadion.actions';
import { Stadion, StadionModel } from '../types/stadion.module';

export const adapter: EntityAdapter<StadionModel> =
  createEntityAdapter<StadionModel>({
    selectId: (entity: StadionModel) => entity.StadionID || '', // Use empty string as a fallback
  });

export const initialState: EntityState<Stadion> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer4 = createReducer(
  initialState,

  on(StadionActions.getStadion, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(StadionActions.getStadionSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(StadionActions.getIStadionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(StadionActions.postStadion, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(StadionActions.postStadionSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.stadion, state),
    };
  }),
  on(StadionActions.postStadionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
