import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LigaActions from '../actions/liga.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LigaService } from 'src/app/services/liga.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class LigaEffects {
  getAnimeStudija$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LigaActions.getLige),
      mergeMap(() => {
        return this.ligaService.getAllLige().pipe(
          tap((mesta) => {
            console.log('API Response - getAllLige', mesta);
          }),
          map((mesta) => LigaActions.getLigeSuccess({ mesta })),
          catchError((error) =>
            of(LigaActions.getLigeFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ligaService: LigaService,
    private router: Router
  ) {}
}
