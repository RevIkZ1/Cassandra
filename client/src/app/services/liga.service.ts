import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Liga, LigaModel } from '../store/types/liga.module';

@Injectable({
  providedIn: 'root',
})
export class LigaService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllLige(): Observable<LigaModel[]> {
    return this.http
      .get<LigaModel[]>('http://localhost:3000/Liga/VratiLige', {
        withCredentials: true,
      })
      .pipe(tap((rezultati: LigaModel[]) => {}));
  }
  postliga(liga: LigaModel): Observable<Liga[]> {
    const ligaData = {
      liga_id: '',
      drzava: liga.drzava,
      godinaosnivanja: liga.godinaosnivanja,
      imelige: liga.imelige,
    };
    return this.http.post<Liga[]>(
      `http://localhost:3000/Liga/DodajLigu`,
      ligaData,
      {
        withCredentials: true,
      }
    );
  }
}
