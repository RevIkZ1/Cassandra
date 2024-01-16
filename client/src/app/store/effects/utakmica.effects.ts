import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UtakmicaActions from '../actions/utakmica.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LigaService } from 'src/app/services/liga.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UtakmicaService } from 'src/app/services/utakmica.service';

@Injectable()
export class UtakmicaEffects {
  getUtakmice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UtakmicaActions.getUtakmice),
      mergeMap(() => {
        return this.utakmicaService.getAllUtakmice().pipe(
          tap((utakmice) => {
            console.log('API Response - getAllUtakmice', utakmice);
          }),
          map((utakmice) => UtakmicaActions.getUtakmiceSuccess({ utakmice })),
          catchError((error) =>
            of(UtakmicaActions.getUtakmiceFailure({ error: error.message }))
          )
        );
      })
    )
  );

  postUtakmica$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UtakmicaActions.postUtakmica),
      switchMap((action) => {
        return this.utakmicaService.postUtakmica(action.utakmica).pipe(
          map(() =>
            UtakmicaActions.postUtakmicaSuccess({
              utakmica: action.utakmica,
            })
          ),
          catchError((error) =>
            of(
              UtakmicaActions.postUtakmicaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );

  putDoktor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UtakmicaActions.putUtakmica),
      switchMap((action) => {
        return this.utakmicaService
          .putUtakmcia(
            action.id,
            action.DomacinGo,
            action.GostGo,
            action.DomacinCrveni,
            action.GostCrveni,
            action.DomacinZuti,
            action.GostZuti,
            action.AsistencijaDomacin,
            action.AsistencijaGost
          )
          .pipe(
            map(() =>
              UtakmicaActions.putUtakmicaSuccess({
                id: action.id,
                DomacinGo: action.DomacinGo,
                GostGo: action.GostGo,
                DomacinCrveni: action.DomacinCrveni,
                GostCrveni: action.GostCrveni,
                DomacinZuti: action.DomacinZuti,
                GostZuti: action.GostZuti,
                AsistencijaDomacin: action.AsistencijaDomacin,
                AsistencijaGost: action.AsistencijaGost,
              })
            ),
            catchError((error) =>
              of(
                UtakmicaActions.postUtakmicaFailure({
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
    private utakmicaService: UtakmicaService,
    private router: Router
  ) {}
}
