import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import * as StadionActions from '../actions/stadion.actions';
import { StadionService } from 'src/app/services/stadion.service';

@Injectable()
export class StadionEffects {
  getdoktorFromUstanova$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StadionActions.getStadion),
      mergeMap((action) => {
        return this.stadionService.getStadionByTim(action.id).pipe(
          map((mesta) => StadionActions.getStadionSuccess({ mesta })),
          catchError((error) =>
            of(
              StadionActions.getIStadionFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  postStadion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StadionActions.postStadion),
      switchMap((action) => {
        return this.stadionService.postStadion(action.stadion, action.id).pipe(
          map(() =>
            StadionActions.postStadionSuccess({
              stadion: action.stadion,
            })
          ),
          catchError((error) =>
            of(
              StadionActions.postStadionFailure({
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
    private stadionService: StadionService,
    private router: Router
  ) {}
}
