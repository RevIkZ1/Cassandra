import { createAction, props } from '@ngrx/store';
import { User, UserModel } from '../types/user.module';

export const loginUser = createAction(
  '[Login Page] Login User',
  props<{ user: { username: string; password: string } }>()
);

export const loginUserSuccess = createAction(
  '[Login Page] Login User success',
  props<{ message: string }>()
);

export const loginUserFailure = createAction(
  '[Login Page] Login User failure',
  props<{ error: string }>()
);
export const logOutUser = createAction('[Login Page] Log out');
export const logOutUserSuccess = createAction(
  '[Login Page] Log out Success',
  props<{ message: string }>()
);
export const logOutUserFailure = createAction(
  '[Login Page] Log out Failure',
  props<{ error: string }>()
);

export const browserRolead = createAction(
  '[App component] refresh browser',
  props<{ isLoading: boolean; isLoggedin: boolean }>()
);
export const addTimToUser = createAction(
  '[TIm page] Post TIm',
  props<{
    userId: string;
    id: string;
  }>()
);

export const addTimToUserSuccess = createAction(
  '[TIm page] Post TIm Success',
  props<{
    user: UserModel;
  }>()
);

export const addTimToUserFailure = createAction(
  '[TIm  page] Post TIm Failure',
  props<{ error: string }>()
);
