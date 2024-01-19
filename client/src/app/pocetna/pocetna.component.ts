import { Component, OnInit } from '@angular/core';
import { Observable, defaultIfEmpty } from 'rxjs';
import { Liga, LigaModel } from '../store/types/liga.module';
import { LigaService } from '../services/liga.service';
import { LigaState } from '../store/types/liga.interface';
import { Store, select } from '@ngrx/store';
import {
  selectorLige,
  selectorLigeError,
  selectorLigeLoading,
} from '../store/selectors/liga.selector';
import * as LigaActions from '../store/actions/liga.actions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { selectUserFeature } from '../store/selectors/user.selector';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  lige$?: Observable<LigaModel[]>;
  form!: FormGroup;
  isLoggedIn!: boolean;
  authenticated = true;
  constructor(
    private store: Store<LigaState>,
    private ligaService: LigaService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store.select(selectorLigeLoading);
    this.error$ = this.store.select(selectorLigeError);
    this.lige$ = this.store.select(selectorLige).pipe(defaultIfEmpty([]));
  }

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.form = this.formBuilder.group({
      drzava: new FormControl('', Validators.required),
      godinaosnivanja: new FormControl('', Validators.required),
      imelige: new FormControl('', Validators.required),
    });
    this.store.dispatch(LigaActions.getLige());
  }

  addLiga() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        console.log(info);
        try {
          await this.store.dispatch(
            LigaActions.postLiga({
              liga: {
                drzava: info.drzava,
                godinaosnivanja: info.godinaosnivanja,
                imelige: info.imelige,
                liga_id: '',
              },
            })
          );
          this.form.reset();
        } catch (error) {
          console.error('Error while posting Liga:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
  prikazi() {
    this.lige$?.subscribe((res) => {
      console.log(res);
    });
  }
}
