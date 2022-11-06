import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, switchMap, throwError } from 'rxjs';
import { User } from '../../models/auth.model';
import { GetTokenService } from '../../services/get-token.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [
        Validators.required,
        this.passValidator(
          /(?=.*\d)(?=.*[a-z])(?=.*[ !@#?])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/i
        ),
      ]),
    },
    { updateOn: 'submit' }
  )

  constructor(
    private registrationService: RegistrationService,
    private getTokenService: GetTokenService,
  ) {}

  passValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed = regex.test(control.value);
      return allowed ? null : { password: true };
    };
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error.message);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  onSubmit() {
    if(this.signUpForm.valid) {
      this.registrationService.signup(this.signUpForm.value as User).pipe(
        switchMap(() => this.getTokenService.getToken({
          login: this.signUpForm.controls.login.value as string,
          password: this.signUpForm.controls.password.value as string
        })),
        catchError(this.handleError)
      ).subscribe();
    }
  }
}
