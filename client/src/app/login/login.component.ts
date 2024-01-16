import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserState } from '../store/types/user.interface';
import { Store, select } from '@ngrx/store';
import {
  selectorLoading,
  selectorLoggedin,
} from '../store/selectors/user.selector';
import * as UserActions from '../store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private store: Store<UserState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectorLoading));
    this.isLoggedIn$ = this.store.pipe(select(selectorLoggedin));
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(): void {
    const credentials = this.form.value;
    console.log(credentials);
    this.store.dispatch(
      UserActions.loginUser({
        user: {
          username: credentials.username,
          password: credentials.password,
        },
      })
    );
  }
}
