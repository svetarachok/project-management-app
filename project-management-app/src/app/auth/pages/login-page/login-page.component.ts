import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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

  constructor(private authService: AuthService, private router: Router) {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error.message
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          login: this.loginForm.controls.login.value as string,
          password: this.loginForm.controls.password.value as string,
        })
        .pipe(catchError(this.handleError))
        .subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
