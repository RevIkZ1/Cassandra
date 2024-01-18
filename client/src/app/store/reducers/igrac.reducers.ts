import { Liga, LigaModel } from '../types/liga.module';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as IgracActions from '../actions/igrac.actions';
import { Igrac, IgracModel } from '../types/igrac.module';

export const adapter: EntityAdapter<IgracModel> =
  createEntityAdapter<IgracModel>({
    selectId: (entity: IgracModel) => entity.IgracID || '', // Use empty string as a fallback
  });

export const initialState: EntityState<Igrac> = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
  domaci: [],
  gostujuci: [],
});

export const reducer3 = createReducer(
  initialState,

  on(IgracActions.getIgrac, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(IgracActions.getIgracSuccess, (state, action) => {
    return adapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(IgracActions.getIgracFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(IgracActions.postIgrac, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(IgracActions.postIgracSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.igrac, state),
    };
  }),
  on(IgracActions.postIgracFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(IgracActions.deleteIgrac, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(IgracActions.deleteIgracSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(IgracActions.deleteIgracFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
