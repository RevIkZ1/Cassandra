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

  //   postDoktor$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(IgracActions.postIgrac),
  //       switchMap((action) => {
  //         return this.igracService.p(action.tim, action.id).pipe(
  //           map(() =>
  //           IgracActions.postTImSuccess({
  //               tim: action.tim,
  //             })
  //           ),
  //           catchError((error) =>
  //             of(
  //                 IgracActions.postTImFailure({
  //                 error: error.message,
  //               })
  //             )
  //           )
  //         );
  //       })
  //     )
  //   );

  constructor(
    private actions$: Actions,
    private stadionService: StadionService,
    private router: Router
  ) {}
}
