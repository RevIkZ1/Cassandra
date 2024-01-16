import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as IgracActions from '../actions/igrac.actions';
import { IgracService } from 'src/app/services/igrac.service';

@Injectable()
export class IgracEffects {
  getdoktorFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IgracActions.getIgrac),
      mergeMap((action) => {
        return this.igracService.getIgraciByTim(action.id).pipe(
          map((mesta) => IgracActions.getIgracSuccess({ mesta })),
          catchError((error) =>
            of(
              IgracActions.getIgracFailure({
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
      ofType(IgracActions.postIgrac),
      switchMap((action) => {
        return this.igracService.postTim(action.igrac, action.id).pipe(
          map(() =>
            IgracActions.postIgracSuccess({
              igrac: action.igrac,
            })
          ),
          catchError((error) =>
            of(
              IgracActions.postIgracFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private igracService: IgracService,
    private router: Router
  ) {}
}
