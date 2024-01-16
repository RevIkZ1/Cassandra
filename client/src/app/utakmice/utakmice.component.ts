import { Component, OnInit } from '@angular/core';
import { Utakmica, UtakmicaModel } from '../store/types/utakmica.module';
import { Observable, defaultIfEmpty } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtakmicaState } from '../store/types/utakmica.interface';
import { Store, select } from '@ngrx/store';
import { UtakmicaService } from '../services/utakmica.service';
import { ActivatedRoute } from '@angular/router';
import {
  selecUtakmicaFeature,
  selectUtakmice,
  selectorUtakmica,
  selectorUtakmicaError,
  selectorUtakmicaLoading,
} from '../store/selectors/utakmica.selector';
import { selectorLige } from '../store/selectors/liga.selector';
import * as UtakmicaActions from '../store/actions/utakmica.actions';
import { Tim } from '../store/types/tim.module';
import * as TimActions from '../store/actions/tim.actions';
import { timoviSelector } from '../store/selectors/tim.selector';
import { TimState } from '../store/types/tim.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-utakmice',
  templateUrl: './utakmice.component.html',
  styleUrls: ['./utakmice.component.css'],
})
export class UtakmiceComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  utakmice$?: Observable<UtakmicaModel[]>;
  form!: FormGroup;
  tim$?: Observable<Tim[]>;
  tim1$?: Observable<Tim[]>;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store<UtakmicaState>,
    private store1: Store<TimState>,

    private ustakmicaService: UtakmicaService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store.select(selectorUtakmicaLoading);
    this.error$ = this.store.select(selectorUtakmicaError);
    this.utakmice$ = this.store
      .select(selectorUtakmica)
      .pipe(defaultIfEmpty([]));
    this.tim$ = this.store1.select(timoviSelector);
    this.tim1$ = this.store1.select(timoviSelector);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      datumosnivanja: new FormControl('', Validators.required),
      imetima: new FormControl('', Validators.required),
      trener: new FormControl('', Validators.required),
    });

    this.store.dispatch(UtakmicaActions.getUtakmice());

    this.store
      .pipe(select(selectUtakmice), takeUntil(this.ngUnsubscribe))
      .subscribe((utakmice) => {
        if (utakmice && utakmice.length > 0) {
          utakmice.forEach((utakmica) => {
            if (utakmica.DomacinID) {
              this.getDomacin(utakmica.DomacinID);
            }

            if (utakmica.GostujuciTimID) {
              this.getGost(utakmica.GostujuciTimID);
            }
          });
        }
      });
  }
  prikazi() {
    this.utakmice$?.subscribe((res) => {
      console.log(res);
    });
  }
  async getDomacin(id: string) {
    try {
      await this.store1.dispatch(TimActions.getTim({ id }));
    } catch (error) {
      console.error('Error while posting Doktor:', error);
    }
  }
  async getGost(id: string) {
    try {
      await this.store1.dispatch(TimActions.getTim({ id }));
    } catch (error) {
      console.error('Error while posting Doktor:', error);
    }
  }
}
