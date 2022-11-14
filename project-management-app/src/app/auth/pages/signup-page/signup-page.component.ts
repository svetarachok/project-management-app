import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { NewUser } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { ownValidator, passValidator } from '../../../shared/utils/validators';

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
        ownValidator(/^([A-Za-zА-ЯЁа-яё]+)( ?)([A-Za-zА-ЯЁа-яё]+)?$/i),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        ownValidator(/^([A-Za-z0-9]+)$/i),
      ]),
      password: new FormControl('', [Validators.required, passValidator()]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

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
