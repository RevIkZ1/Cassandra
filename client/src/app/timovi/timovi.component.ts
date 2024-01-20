import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LigaModel } from '../store/types/liga.module';
import { Tim } from '../store/types/tim.module';
import { LigaState } from '../store/types/liga.interface';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TimState } from '../store/types/tim.interface';
import { LigaService } from '../services/liga.service';
import { TimService } from '../services/tim.service';
import {
  timError,
  timLoading,
  timoviSelector,
} from '../store/selectors/tim.selector';
import * as TimActions from '../store/actions/tim.actions';
import * as UtakmicaActions from '../store/actions/utakmica.actions';
import { UserModel } from '../store/types/user.module';
import * as UserActions from '../store/actions/user.actions';
import { selectUserFeature } from '../store/selectors/user.selector';

@Component({
  selector: 'app-timovi',
  templateUrl: './timovi.component.html',
  styleUrls: ['./timovi.component.css'],
})
export class TimoviComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  tim$?: Observable<Tim[]>;
  form!: FormGroup;
  matchForm!: FormGroup;
  user: UserModel;
  isLoggedIn!: boolean;
  authenticated = true;
  constructor(
    private store: Store<LigaState>,
    private store1: Store<TimState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ligaService: LigaService,
    private timService: TimService
  ) {
    this.isLoading$ = this.store.select(timLoading);
    this.error$ = this.store.select(timError);
    this.tim$ = this.store1.select(timoviSelector);
    this.user = new UserModel();
  }
  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.matchForm = this.formBuilder.group({
      domaci: new FormControl('', Validators.required),
      gostujuci: new FormControl('', Validators.required),
      datumUtakmice: new FormControl('', Validators.required),
    });
    this.form = this.formBuilder.group({
      datumosnivanja: new FormControl('', Validators.required),
      imetima: new FormControl('', Validators.required),
      trener: new FormControl('', Validators.required),
    });
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.store1.dispatch(TimActions.getTimovi({ id }));
    });
    const userJson = localStorage.getItem('loggedUser');
    if (userJson != null) {
      const userObject = JSON.parse(userJson);
      this.user = new UserModel(
        userObject.UserID,
        userObject.username,
        userObject.password
      );
    }
  }
  selectTeamForMatch(selectedTeamId: string | undefined) {}
  addTim() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const id = params['id']; // Assuming you get the ID from route params

        try {
          await this.store.dispatch(
            TimActions.postTIm({
              tim: {
                datumosnivanja: info.datumosnivanja,
                imetima: info.imetima,
                trener: info.trener,
              },
              id: id,
            })
          );

          this.form.reset();
        } catch (error) {
          console.error('Error while posting Doktor:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
  prikazi() {
    this.tim$?.subscribe((res) => {});
  }
  async addMatch() {
    if (this.matchForm.valid) {
      const matchInfo = this.matchForm.value;

      try {
        await this.store.dispatch(
          UtakmicaActions.postUtakmica({
            utakmica: {
              UtakmicaID: '',
              DomacinID: matchInfo.domaci,
              GostujuciTimID: matchInfo.gostujuci,
              StadionID: matchInfo.domaci,
              Datum: matchInfo.datumUtakmice,
              golovidomacin: 0,
              golovigost: 0,
              AsistencijeDomacin: [],
              AsistencijeGosti: [],
              CrveniKartoniDomacin: [],
              CrveniKartoniGosti: [],
              GoloviDomacin: [],
              GoloviGosti: [],
              ZutiKartoniDomacin: [],
              ZutiKartoniGosti: [],
            },
          })
        );

        this.form.reset();
      } catch (error) {
        console.error('Error while posting Doktor:', error);
      }
      this.matchForm.reset();
    } else {
      alert('Molimo Vas popunite sva polja za utakmicu.');
    }
  }
  dodajKodUsera(id: string | undefined) {
    if (this.user.id !== undefined) {
      const existingTeams = this.user.listatimova || [];

      if (existingTeams.includes(id as string)) {
        window.alert('Tim već dodat!');
        return;
      }

      this.store.dispatch(
        UserActions.addTimToUser({
          userId: this.user.id.toString(),
          id: id || '',
        })
      );
    }
  }
}
