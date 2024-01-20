import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Stadion, StadionModel } from '../store/types/stadion.module';

@Injectable({
  providedIn: 'root',
})
export class StadionService {
  constructor(private http: HttpClient, private router: Router) {}

  getStadionByTim(id: number): Observable<StadionModel[]> {
    return this.http
      .get<StadionModel[]>(`http://localhost:3000/Stadion/VratiStadion/${id}`, {
        withCredentials: true,
      })
      .pipe(tap((rezultati: StadionModel[]) => {}));
  }
  postStadion(stadion: StadionModel, id: string): Observable<Stadion[]> {
    const stadionData = {
      StadionID: '',
      TimID: id,
      grad: stadion.grad,
      imestadiona: stadion.imestadiona,
      kapacitet: stadion.kapacitet,
    };
    return this.http.post<Stadion[]>(
      `http://localhost:3000/Stadion/DodajStadion`,
      stadionData,
      {
        withCredentials: true,
      }
    );
  }
}
