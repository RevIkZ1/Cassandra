import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserModel } from '../store/types/user.module';
import { Tim } from '../store/types/tim.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimService } from '../services/tim.service';
import { TimState } from '../store/types/tim.interface';
import { Store } from '@ngrx/store';
import { UserState } from '../store/types/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectorError,
  selectorLoading,
  userSelector,
} from '../store/selectors/user.selector';
import * as TimActions from '../store/actions/tim.actions';
import { timSelector, timoviSelector } from '../store/selectors/tim.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  user?: User | null;
  tim$?: Observable<Tim[]>;
  useri$: Observable<UserModel | null>;
  form!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private timService: TimService,
    private route: ActivatedRoute,
    private store: Store<TimState>,
    private store1: Store<UserState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store1.select(selectorLoading);
    this.error$ = this.store1.select(selectorError);
    this.useri$ = this.store1.select(userSelector);
    this.tim$ = this.store.select(timoviSelector);
    this.user = new UserModel();
  }
  async ngOnInit(): Promise<void> {
    const userJson = localStorage.getItem('loggedUser');
    if (userJson != null) {
      const userObject = JSON.parse(userJson);
      this.user = new UserModel(
        userObject.UserID,
        userObject.username,
        userObject.password,
        userObject.listatimova
      );
      console.log(this.user);
      this.route.params.subscribe(async (params) => {
        if (this.user?.id !== undefined) {
          this.store.dispatch(
            TimActions.getTimByUser({ id: this.user.id.toString() })
          );
        }
        console.log(this.store);
      });
    }
  }
}
