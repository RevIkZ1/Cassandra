import { UtakmicaState } from '../types/utakmica.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UtakmicaModel } from '../types/utakmica.module';
import { createReducer, on } from '@ngrx/store';
import * as UtakmicaActions from '../actions/utakmica.actions';

export const adapter: EntityAdapter<UtakmicaModel> =
  createEntityAdapter<UtakmicaModel>({
    selectId: (entity: UtakmicaModel) => entity.UtakmicaID || '',
  });

export const initialState: UtakmicaState = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
  utakmica: null,
});

export const reducers8 = createReducer(
  initialState,
  on(UtakmicaActions.getUtakmice, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UtakmicaActions.getUtakmiceSuccess, (state, action) => {
    return adapter.setAll(action.utakmice, { ...state, isLoading: false });
  }),
  on(UtakmicaActions.getUtakmiceFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(UtakmicaActions.postUtakmica, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(UtakmicaActions.postUtakmicaSuccess, (state, action) => {
    return {
      ...state,
      ...adapter.upsertOne(action.utakmica, state),
      isLoading: false,
    };
  }),
  on(UtakmicaActions.postUtakmicaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(UtakmicaActions.putUtakmica, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(UtakmicaActions.putUtakmicaSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(UtakmicaActions.postUtakmicaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
