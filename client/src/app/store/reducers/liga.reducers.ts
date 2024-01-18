import { LigaState } from '../types/liga.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LigaModel } from '../types/liga.module';
import { createReducer, on } from '@ngrx/store';
import * as LigaActions from '../actions/liga.actions';
export const adapter: EntityAdapter<LigaModel> = createEntityAdapter<LigaModel>(
  {
    selectId: (entity: LigaModel) => entity.liga_id,
  }
);

export const initialState: LigaState = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
  liga: null,
});

export const reducers2 = createReducer(
  initialState,
  on(LigaActions.getLige, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(LigaActions.getLigeSuccess, (state, action) => {
    return adapter.addMany(action.mesta, {
      ...state,
      isLoading: false,
    });
  }),
  on(LigaActions.getLigeFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(LigaActions.postLiga, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(LigaActions.postLigaSuccess, (state, action) => {
    return {
      ...state,
      ...adapter.upsertOne(action.liga, state),
      isLoading: false,
    };
  }),
  on(LigaActions.postLigaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
