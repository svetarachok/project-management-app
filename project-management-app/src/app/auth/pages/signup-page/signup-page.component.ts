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
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { NewUser } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  submited = false;

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.ownValidator(/^([A-Za-zА-ЯЁа-яё]+)( ?)([A-Za-zА-ЯЁа-яё]+)?$/i),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.ownValidator(/^([A-Za-z0-9]+)$/i),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.passValidator(),
      ]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  passValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errorMessage = {
        errorMsg: {
          hasMinLength: '',
          hasUpperCase: '',
          hasNumeric: '',
          hasSpecSymbol: '',
        },
      };

      if (!value) {
        return null;
      }

      const hasMinLength = /^.{8,}$/.test(value);

      if (!hasMinLength) {
        errorMessage.errorMsg.hasMinLength =
          'Minimum password length 8 characters';
      }

      const hasUpperCase = /[A-Z]/.test(value);

      if (!hasUpperCase) {
        errorMessage.errorMsg.hasUpperCase =
          'Password must contain uppercase letters';
      }

      const hasNumeric = /[0-9]/.test(value);

      if (!hasNumeric) {
        errorMessage.errorMsg.hasNumeric = 'Password must contain numbers';
      }
      const hasSpecSymbol = /[!@#?\]]/.test(value);

      if (!hasSpecSymbol) {
        errorMessage.errorMsg.hasSpecSymbol =
          'Password must contain special chars: ! @ # ? ]';
      }

      return hasMinLength && hasUpperCase && hasNumeric && hasSpecSymbol
        ? null
        : errorMessage;
    };
  }

  ownValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || (value && value.length < 2)) {
        return null;
      }

      const allowed = regex.test(value);
      return allowed ? null : { errorMsg: true };
    };
  }

  handleError(error: HttpErrorResponse) {
    this.snackBarService.openSnackBar(
      `${error.error.statusCode}: ${error.error.message}`
    );

    return throwError(
      () => new Error(`${error.error.statusCode}: ${error.error.message}`)
    );
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.submited = true;
      this.authService
        .signup(this.signUpForm.value as NewUser)
        .pipe(
          finalize(() => {
            this.submited = false;
          }),
          switchMap(() => {
            return this.authService.login({
              login: this.signUpForm.controls.login.value as string,
              password: this.signUpForm.controls.password.value as string,
            });
          }),
          catchError(err => this.handleError(err))
        )
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    }
  }
}
