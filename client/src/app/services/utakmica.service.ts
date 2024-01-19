import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  concatMap,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  tap,
  toArray,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Liga, LigaModel } from '../store/types/liga.module';
import { Utakmica, UtakmicaModel } from '../store/types/utakmica.module';
import { TimModel } from '../store/types/tim.module';

@Injectable({
  providedIn: 'root',
})
export class UtakmicaService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllUtakmice(): Observable<UtakmicaModel[]> {
    return this.http
      .get<UtakmicaModel[]>('http://localhost:3000/Utakmica/VratiUtakmice', {
        withCredentials: true,
      })
      .pipe(
        concatMap((utakmice: UtakmicaModel[]) => {
          // Sequentially process domacinRequests
          return from(utakmice)
            .pipe(
              filter((utakmica) => utakmica.DomacinID !== undefined),
              concatMap((utakmica) =>
                this.getTimById(utakmica.DomacinID!).pipe(
                  tap(() => console.log('DomacinID:', utakmica.DomacinID)),
                  map((domacin: TimModel[]) => ({
                    ...utakmica,
                    Domacin: domacin[0],
                  }))
                )
              )
            )
            .pipe(
              toArray(),
              // Combine the results of domacinRequests with utakmice array
              map((domacinResults) => {
                return utakmice.map((utakmica) => {
                  if (utakmica.DomacinID !== undefined) {
                    const domacin = domacinResults.find(
                      (result) => result.DomacinID === utakmica.DomacinID
                    );
                    if (domacin) {
                      return { ...utakmica, Domacin: domacin.Domacin };
                    }
                  }
                  return utakmica;
                });
              })
            );
        }),
        concatMap((utakmiceWithDomacin: UtakmicaModel[]) => {
          // Sequentially process gostRequests
          return from(utakmiceWithDomacin)
            .pipe(
              filter((utakmica) => utakmica.GostujuciTimID !== undefined),
              concatMap((utakmica) =>
                this.getTimById(utakmica.GostujuciTimID!).pipe(
                  map((gost: TimModel[]) => ({ ...utakmica, Gos: gost[0] }))
                )
              )
            )
            .pipe(toArray());
        }),
        tap((utakmiceWithTeams: UtakmicaModel[]) => {
          console.log('Utakmice with Teams:', utakmiceWithTeams);
        })
      );
  }
  getTimById(id: string): Observable<TimModel[]> {
    if (id != null) {
      return this.http
        .get<TimModel[]>(`http://localhost:3000/Tim/tim/${id}`, {
          withCredentials: true,
        })
        .pipe(
          tap((rezultati: TimModel[]) => {
            console.log('Posle HTTP zahteva. Rezultati:', rezultati);
          })
        );
    } else {
      return of([]);
    }
  }
  postUtakmica(utakmica: Utakmica): Observable<Utakmica[]> {
    const utakmciaData = {
      UtakmicaID: '',
      DomacinID: utakmica.DomacinID,
      GostujuciTimID: utakmica.GostujuciTimID,
      StadionID: utakmica.DomacinID,
      Datum: utakmica.Datum,
      golovidomacin: 0,
      golovigost: 0,
      AsistencijeDomacin: [],
      AsistencijeGosti: [],
      CrveniKartoniDomacin: [],
      CrveniKartoniGosti: [],
      GoloviDomacin: [],
      GoloviGosti: [],
      ZutiKartoniDomacin: [],
      ZutiKartoniGosti: [],
    };
    return this.http.post<Utakmica[]>(
      `http://localhost:3000/Utakmica/DodajUtakmica`,
      utakmciaData,
      {
        withCredentials: true,
      }
    );
  }
  putUtakmcia(
    id: string,
    DomacinGo: string,
    GostGo: string,
    DomacinCrveni: string,
    GostCrveni: string,
    DomacinZuti: string,
    GostZuti: string,
    AsistencijaDomacin: string,
    AsistencijaGost: string
  ): Observable<Utakmica[]> {
    const data = {
      id,
      DomacinGo,
      GostGo,
      DomacinCrveni,
      GostCrveni,
      DomacinZuti,
      GostZuti,
      AsistencijaDomacin,
      AsistencijaGost,
    };

    return this.http.put<Utakmica[]>(
      `http://localhost:3000/Utakmica/IzmeniUtakmicu`,
      data,
      {
        withCredentials: true,
      }
    );
  }
}
