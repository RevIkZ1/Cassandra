import { Component } from '@angular/core';
import { UserState } from './store/types/user.interface';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(private store: Store<UserState>) {}
  ngOnInit(): void {
    let loggedIn = false;
    if (localStorage.getItem('isLoggedIn')) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    this.store.dispatch(
      UserActions.browserRolead({ isLoading: false, isLoggedin: loggedIn })
    );
  }
}
