import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { reducers2 } from './store/reducers/liga.reducers';
import { LigaEffects } from './store/effects/liga.effects';
import { TimoviComponent } from './timovi/timovi.component';
import { TimEffects } from './store/effects/tim.effects';
import { reducer1 } from './store/reducers/tim.reducers';
import { IgraciComponent } from './igraci/igraci.component';
import { reducer3 } from './store/reducers/igrac.reducers';
import { IgracEffects } from './store/effects/igrac.effects';
import { StadionComponent } from './stadion/stadion.component';
import { StadionEffects } from './store/effects/stadion.effects';
import { reducer4 } from './store/reducers/stadion.reducers';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserEffects } from './store/effects/user.effects';
import { reducers } from './store/reducers/user.reducers';
import { HeaderComponent } from './header/header.component';
import { UtakmiceComponent } from './utakmice/utakmice.component';
import { UtakmicaEffects } from './store/effects/utakmica.effects';
import { reducers8 } from './store/reducers/utakmica.reducers';
import { UtakmicaComponent } from './utakmica/utakmica.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    TimoviComponent,
    IgraciComponent,
    StadionComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    UtakmiceComponent,
    UtakmicaComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), // Ensure this line is present
    StoreModule.forFeature('Liga', reducers2),
    StoreModule.forFeature('Tim', reducer1),
    StoreModule.forFeature('Igrac', reducer3),
    StoreModule.forFeature('Stadion', reducer4),
    StoreModule.forFeature('User', reducers),
    StoreModule.forFeature('Utakmica', reducers8),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
      autoPause: true,
    }),
    EffectsModule.forRoot([
      LigaEffects,
      TimEffects,
      IgracEffects,
      StadionEffects,
      UserEffects,
      UtakmicaEffects,
    ]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
