import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { createAction } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import { catchError, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../types/user.module';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginUser),
      mergeMap((admin) => {
        return this.loginService
          .login(admin.user.username, admin.user.password)
          .pipe(
            map(() => userActions.loginUserSuccess({ message: 'Uspesno' })),
            catchError((error) =>
              of(userActions.loginUserFailure({ error: error.message }))
            )
          );
      })
    )
  );
  logInUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginUserSuccess),
        tap(() => {
          this.authService.getLoggedUser().subscribe((admin) => {
            localStorage.setItem('loggedUser', JSON.stringify(admin));
            localStorage.setItem('isLoggedIn', 'true');
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
  logInUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginUserFailure),
        tap(() => {
          alert('Pogresni username ili sifra');
        })
      ),
    { dispatch: false }
  );
  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.logOutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() =>
            userActions.logOutUserSuccess({ message: 'Uspesno izlogovan' })
          ),
          catchError((error) => of(userActions.logOutUserFailure({ error })))
        )
      )
    )
  );
  logOutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logOutUserSuccess),
        tap(() => {
          localStorage.removeItem('loggedUser');
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
  addTimUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addTimToUser),
      switchMap((action) => {
        return this.userService.postTim(action.userId, action.id).pipe(
          map((user) => userActions.addTimToUserSuccess({ user })),
          catchError((error) =>
            of(userActions.addTimToUserFailure({ error: error.message }))
          )
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
