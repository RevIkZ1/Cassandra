import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Igrac } from '../store/types/igrac.module';
import { Store, select } from '@ngrx/store';
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
import { selectUserFeature } from '../store/selectors/user.selector';

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
  form1!: FormGroup;
  isLoggedIn!: boolean;
  authenticated = true;
  constructor(
    private store: Store<IgracState>,
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
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.form = this.formBuilder.group({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      datumrodjenja: new FormControl('', Validators.required),
      pozicija: new FormControl('', Validators.required),
    });
    this.form1 = this.formBuilder.group({
      grad: new FormControl('', Validators.required),
      imestadiona: new FormControl('', Validators.required),
      kapacitet: new FormControl('', Validators.required),
    });
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.store.dispatch(IgracActions.getIgrac({ id }));
      this.store2.dispatch(StadionActions.getStadion({ id }));
    });
  }
  getImagePath(imeStadiona: string | undefined): string {
    // Provera da li postoji vrednost pre pristupa
    if (imeStadiona) {
      return `assets/images/${imeStadiona}.jpg`; // Zamislite da se slike nalaze u assets/images folderu
    } else {
      return 'putanja/do/slike/po/defaultu.jpg'; // Možete koristiti neku defaultnu sliku
    }
  }
  addIgrac() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
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
          console.error('Error while posting Igrac:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }

  addStadion() {
    this.route.params.subscribe(async (params) => {
      if (this.form1.valid) {
        const info = this.form1.value;
        const id = params['id']; // Assuming you get the ID from route params
        try {
          await this.store.dispatch(
            StadionActions.postStadion({
              stadion: {
                grad: info.grad,
                imestadiona: info.imestadiona,
                kapacitet: info.kapacitet,
              },
              id: id,
            })
          );

          this.form1.reset();
        } catch (error) {
          console.error('Error while posting Igrac:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
  delete(id: string) {
    if (confirm('Da li zaista zelite da obrisete pregled')) {
      this.store.dispatch(IgracActions.deleteIgrac({ id }));
    }
  }
}
