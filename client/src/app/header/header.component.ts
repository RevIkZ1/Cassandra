import { Component, OnInit } from '@angular/core';
import { User, UserModel } from '../store/types/user.module';
import { selectUserFeature } from '../store/selectors/user.selector';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { UserState } from '../store/types/user.interface';
import { HttpClient } from '@angular/common/http';
import * as UserActions from '../store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleMenu = false;
  showDropdown = false;
  logoImg = '../../images/logo.jpg';
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;
  user1: UserModel;
  handleNavBar() {
    this.toggleMenu = !this.toggleMenu;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<UserState>
  ) {
    this.user1 = new UserModel();
  }

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
      const userJson = localStorage.getItem('loggedUser');
      if (userJson !== null) {
        const userObject = JSON.parse(userJson) as {
          id: number;
          username: string;
          password: string;
        };
        this.user1 = new UserModel(
          userObject.id,
          userObject.username,
          userObject.password
        );
      }
    });
  }

  logout(): void {
    this.user = null;

    this.store.dispatch(UserActions.logOutUser());
  }
}
