import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Igrac } from '../store/types/igrac.module';
import { Store } from '@ngrx/store';
import {
  igracError,
  igracLoading,
  igraciSelector,
} from '../store/selectors/igrac.selector';
import { IgracState } from '../store/types/igrac.interface';
import { TimState } from '../store/types/tim.interface';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from '../services/liga.service';
import { TimService } from '../services/tim.service';
import { IgracService } from '../services/igrac.service';
import * as IgracActions from '../store/actions/igrac.actions';
import { Stadion } from '../store/types/stadion.module';
import { StadionState } from '../store/types/stadion.interface';
import { stadioniSelector } from '../store/selectors/stadion.selector';
import * as StadionActions from '../store/actions/stadion.actions';

@Component({
  selector: 'app-igraci',
  templateUrl: './igraci.component.html',
  styleUrls: ['./igraci.component.css'],
})
export class IgraciComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  igraci$?: Observable<Igrac[]>;
  stadioni$?: Observable<Stadion[]>;
  form!: FormGroup;
  constructor(
    private store: Store<IgracState>,
    private store1: Store<TimState>,
    private store2: Store<StadionState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ligaService: LigaService,
    private igracService: IgracService
  ) {
    this.isLoading$ = this.store.select(igracLoading);
    this.error$ = this.store.select(igracError);
    this.igraci$ = this.store.select(igraciSelector);
    this.stadioni$ = this.store.select(stadioniSelector);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      datumrodjenja: new FormControl('', Validators.required),
      pozicija: new FormControl('', Validators.required),
    });
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.store1.dispatch(IgracActions.getIgrac({ id }));
      this.store2.dispatch(StadionActions.getStadion({ id }));
    });
  }
  getImagePath(imeStadiona: string): string {
    return `assets/images/${imeStadiona}.jpg`;
  }
  addIgrac() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        console.log(info);
        const id = params['id']; // Assuming you get the ID from route params
        try {
          await this.store.dispatch(
            IgracActions.postIgrac({
              igrac: {
                ime: info.ime,
                prezime: info.prezime,
                datumrodjenja: info.datumrodjenja,
                pozicija: info.pozicija,
                asistencije: 0,
                crvenikartoni: 0,
                odigranihmeceva: 0,
                postignutigolovi: 0,
                zutikartoni: 0,
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
}
