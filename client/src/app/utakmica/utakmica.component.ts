import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Igrac } from '../store/types/igrac.module';
import { IgracState } from '../store/types/igrac.interface';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as IgracActions from '../store/actions/igrac.actions';
import * as UtakmicaActions from '../store/actions/utakmica.actions';

import {
  igracError,
  igracLoading,
  igraciSelector,
} from '../store/selectors/igrac.selector';
import { selectUserFeature } from '../store/selectors/user.selector';

@Component({
  selector: 'app-utakmica',
  templateUrl: './utakmica.component.html',
  styleUrls: ['./utakmica.component.css'],
})
export class UtakmicaComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  igraci$?: Observable<Igrac[]>;

  utakmicaForm = this.formBuilder.group({
    domaci: [''],
    gostujuci: [''],
  });
  isLoggedIn!: boolean;
  authenticated = true;
  isShowingGosti = false;

  constructor(
    private store: Store<IgracState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store.select(igracLoading);
    this.error$ = this.store.select(igracError);
    this.igraci$ = this.store.select(igraciSelector);
  }

  ngOnInit(): void {
    this.loadDomacinInfo();
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
  }

  loadGostInfo() {
    this.route.params.subscribe(async (params) => {
      let id = params['GostID'];
      this.store.dispatch(IgracActions.getIgrac({ id }));
      this.isShowingGosti = true;
    });
  }

  loadDomacinInfo() {
    this.route.params.subscribe(async (params) => {
      let id = params['DomacinID'];
      this.store.dispatch(IgracActions.getIgrac({ id }));
      this.isShowingGosti = false;
    });
  }

  switchTeamInfo() {
    this.isShowingGosti ? this.loadDomacinInfo() : this.loadGostInfo();
  }

  logSelectedPlayerId() {
    const selectedPlayerId = this.utakmicaForm.get('domaci')?.value;
    console.log('Selected Player ID:', selectedPlayerId);
  }

  setSelectedPlayerId(paramName: string) {
    const selectedPlayerId = this.utakmicaForm.get('domaci')?.value;
    console.log('Selected Player ID:', selectedPlayerId);
    this.route.params.subscribe(async (params) => {
      let id = params['id'];
      this.store.dispatch(IgracActions.getIgrac({ id }));
      this.isShowingGosti = false;

      const actionPayload: any = {
        id: id,
        DomacinGo: '',
        GostGo: '',
        DomacinCrveni: '',
        GostCrveni: '',
        DomacinZuti: '',
        GostZuti: '',
        AsistencijaDomacin: '',
        AsistencijaGost: '',
      };
      console.log(actionPayload);
      actionPayload[paramName] = selectedPlayerId;

      this.store.dispatch(UtakmicaActions.putUtakmica(actionPayload));
    });
  }
}
