import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { StadionModel } from '../store/types/stadion.module';

@Injectable({
  providedIn: 'root',
})
export class StadionService {
  constructor(private http: HttpClient, private router: Router) {}

  getStadionByTim(id: number): Observable<StadionModel[]> {
    console.log(id);
    return this.http
      .get<StadionModel[]>(`http://localhost:3000/Stadion/VratiStadion/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap((rezultati: StadionModel[]) => {
          console.log('Rezultati from getAllLige:', rezultati);
        })
      );
  }
}
