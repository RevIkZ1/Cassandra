import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { TimoviComponent } from './timovi/timovi.component';
import { IgraciComponent } from './igraci/igraci.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UtakmiceComponent } from './utakmice/utakmice.component';
import { UtakmicaComponent } from './utakmica/utakmica.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PocetnaComponent,
  },
  {
    path: 'timovi/:id',
    component: TimoviComponent,
  },
  {
    path: 'igraci/:id',
    component: IgraciComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'utakmice',
    component: UtakmiceComponent,
  },
  {
    path: 'utakmica/:id',
    component: UtakmicaComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
