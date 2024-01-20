import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Liga, LigaModel } from '../store/types/liga.module';
import { Tim, TimModel } from '../store/types/tim.module';
@Injectable({
  providedIn: 'root',
})
export class TimService {
  constructor(private http: HttpClient, private router: Router) {}

  getTimByLiga(id: number): Observable<TimModel[]> {
    return this.http
      .get<TimModel[]>(`http://localhost:3000/Tim/employees/${id}`, {
        withCredentials: true,
      })
      .pipe(tap((rezultati: TimModel[]) => {}));
  }
  postTim(tim: TimModel, id: string): Observable<Tim[]> {
    const doktorData = {
      TimID: '',
      datumosnivanja: tim.datumosnivanja,
      imetima: tim.imetima,
      trener: tim.trener,
      LigaID: id,
    };
    return this.http.post<Tim[]>(
      `http://localhost:3000/Tim/DodajTim`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
  getTimById(id: string): Observable<TimModel[]> {
    return this.http
      .get<TimModel[]>(`http://localhost:3000/Tim/tim/${id}`, {
        withCredentials: true,
      })
      .pipe(tap((rezultati: TimModel[]) => {}));
  }
  getTimByUser(id: string): Observable<TimModel[]> {
    return this.http
      .get<TimModel[]>(`http://localhost:3000/User/VratiSveTimove/${id}`, {
        withCredentials: true,
      })
      .pipe(tap((rezultati: TimModel[]) => {}));
  }
}
