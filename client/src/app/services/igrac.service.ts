import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Igrac, IgracModel } from '../store/types/igrac.module';

@Injectable({
  providedIn: 'root',
})
export class IgracService {
  constructor(private http: HttpClient, private router: Router) {}

  getIgraciByTim(id: number): Observable<IgracModel[]> {
    return this.http
      .get<IgracModel[]>(`http://localhost:3000/Igrac/VratiIgrace/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap((rezultati: IgracModel[]) => {
          console.log('Rezultati from getIgracByTim:', rezultati);
        })
      );
  }
  postTim(tim: IgracModel, id: string): Observable<Igrac[]> {
    const doktorData = {
      IgracID: '',
      TimID: id,
      asistencije: tim.asistencije,
      crvenikartoni: tim.crvenikartoni,
      datumrodjenja: tim.datumrodjenja,
      ime: tim.ime,
      odigranihmeceva: tim.odigranihmeceva,
      postignutigolovi: tim.postignutigolovi,
      pozicija: tim.pozicija,
      prezime: tim.prezime,
      zutikartoni: tim.zutikartoni,
    };
    return this.http.post<Igrac[]>(
      `http://localhost:3000/Igrac/DodajIgrace`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
  deleteIgrac(id: string) {
    return this.http.delete<string>(
      `http://localhost:3000/Igrac/deleteIgracById/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
