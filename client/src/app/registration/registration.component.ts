import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  username: string = '';
  password: string = '';
  email: string = '';
  photo: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async register() {
    console.log(this.form.value);
    if (this.form.valid) {
      const info = this.form.value;
      try {
        console.log(11111111111);
        const formData = {
          username: info.username,
          password: info.password,
        };
        const existingUser = await this.registrationService.checkExistingUser(
          info.username
        );
        console.log(existingUser);
        if (existingUser) {
          console.error('Korisnik sa istim korisničkim imenom već postoji');
          alert('Postoji dati username');
          return;
        }
        const success = await this.registrationService.registerUser(formData);
        console.log(success);
        if (success) {
          this.router.navigate(['/login']);
          console.log('Registracija uspešna');
          alert('Uspesna registracija mozete se prijaviti');
        } else {
          console.error('Greška prilikom registracije');
          alert('Greška prilikom registracije');
        }
      } catch (error) {
        console.error('Greška prilikom registracije', error);
        alert('Greška prilikom registracije');
      }
    } else {
      alert('Unesi korisničko ime i lozinku');
    }
  }
}
