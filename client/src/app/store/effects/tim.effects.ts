import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as TimActions from '../actions/tim.actions';
import { TimService } from 'src/app/services/tim.service';

@Injectable()
export class TimEffects {
  getdoktorFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimActions.getTimovi),
      mergeMap((action) => {
        return this.timService.getTimByLiga(action.id).pipe(
          map((mesta) => TimActions.getTimoviSuccess({ mesta })),
          catchError((error) =>
            of(
              TimActions.getTimoviFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  getTim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimActions.getTim),
      mergeMap((action) => {
        return this.timService.getTimById(action.id).pipe(
          map((mesta) => TimActions.getTimSuccess({ mesta })),
          catchError((error) =>
            of(
              TimActions.getTimFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getTimByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimActions.getTimByUser),
      mergeMap((action) => {
        return this.timService.getTimByUser(action.id).pipe(
          map((mesta) => TimActions.getTimByUserSuccess({ mesta })),
          catchError((error) =>
            of(
              TimActions.getTimByUserFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  postDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimActions.postTIm),
      switchMap((action) =>
        this.timService.postTim(action.tim, action.id).pipe(
          map(() =>
            TimActions.postTImSuccess({
              tim: action.tim,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private timService: TimService,
    private router: Router
  ) {}
}
