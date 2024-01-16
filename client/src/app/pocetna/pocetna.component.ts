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
    this.form = this.formBuilder.group({
      datumosnivanja: new FormControl('', Validators.required),
      imetima: new FormControl('', Validators.required),
      trener: new FormControl('', Validators.required),
    });
    this.store.dispatch(LigaActions.getLige());
  }
  prikazi() {
    this.lige$?.subscribe((res) => {
      console.log(res);
    });
  }
}
