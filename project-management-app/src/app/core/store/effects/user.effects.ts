import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  fetchUserOnInitApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(() =>
        this.userService.fetchUser().pipe(
          map(currentUser => UserActions.setUser({ user: currentUser })),
          catchError(() => of(UserActions.logoutUser()))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        tap(() => {
          this.userService.logout();
        })
      ),
    { dispatch: false }
  );
}
