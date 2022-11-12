import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new FormGroup(
    {
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  submited = false;

  handleError(error: HttpErrorResponse) {
    this.snackBarService.openSnackBar(
      `${error.error.statusCode}: ${error.error.message}`
    );

    return throwError(
      () => new Error(`${error.error.statusCode}: ${error.error.message}`)
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submited = true;
      this.authService
        .login({
          login: this.loginForm.controls.login.value as string,
          password: this.loginForm.controls.password.value as string,
        })
        .pipe(
          finalize(() => {
            this.submited = false;
          }),
          catchError(err => this.handleError(err))
        )
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    }
  }
}
