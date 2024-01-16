import { Liga, LigaModel } from '../types/liga.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TimActions from '../actions/tim.actions';
import { Tim, TimModel } from '../types/tim.module';

export const adapter: EntityAdapter<TimModel> = createEntityAdapter<TimModel>({
  selectId: (entity: TimModel) => entity.TimID || '', // Use empty string as a fallback
});

export const initialState: EntityState<Tim> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducer1 = createReducer(
  initialState,

  on(TimActions.getTimovi, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimActions.getTimoviSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(TimActions.getTimoviFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(TimActions.getTim, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimActions.getTimSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(TimActions.getTimFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(TimActions.postTIm, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TimActions.postTImSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.tim, state),
    };
  }),
  on(TimActions.postTImFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(TimActions.getTimByUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimActions.getTimByUserSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(TimActions.getTimByUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
