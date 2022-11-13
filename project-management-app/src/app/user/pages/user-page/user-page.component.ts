import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, finalize, throwError } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { getUser } from '../../../core/store/selectors/user.selectors';
import { ownValidator, passValidator } from '../../../shared/utils/validators';

import * as UserAction from '../../../core/store/actions/user.actions';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  currentUser!: User;

  submited = false;

  isSuccessSubmited = false;

  ProfileForm = new FormGroup(
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
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.ProfileForm.setValue({
          name: user.name || '',
          login: user.login,
          password: '',
        });

        if (!user.name) {
          this.store.dispatch(UserAction.fetchUser());
        }
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    this.snackBarService.openSnackBar(
      `${error.error.statusCode}: ${error.error.message}`
    );

    return throwError(
      () => new Error(`${error.error.statusCode}: ${error.error.message}`)
    );
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.ProfileForm.valid) {
      this.submited = true;
      this.userService
        .updateUser(
          {
            name: this.ProfileForm.controls.name.value!,
            login: this.ProfileForm.controls.login.value!,
            password: this.ProfileForm.controls.password.value!,
          },
          this.currentUser._id
        )
        .pipe(
          finalize(() => {
            this.submited = false;
          }),
          catchError(err => this.handleError(err))
        )
        .subscribe(() => {
          this.isSuccessSubmited = true;
          this.ProfileForm.setValue({
            name: this.currentUser.name!,
            login: this.currentUser.login,
            password: '',
          });
          formDirective.resetForm();

          setTimeout(() => {
            this.isSuccessSubmited = false;
          }, 3000);
        });
    }
  }
}
