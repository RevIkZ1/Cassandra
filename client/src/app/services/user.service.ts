import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Igrac, IgracModel } from '../store/types/igrac.module';
import { User } from '../store/types/user.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  postTim(userId: string, id: string): Observable<User> {
    console.log(id);
    console.log(userId);
    return this.http.put<User>(
      `http://localhost:3000/User/addTeamToUser/${userId}/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
