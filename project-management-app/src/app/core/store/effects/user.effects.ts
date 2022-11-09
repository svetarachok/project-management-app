import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BoardsState } from '../state/boards.state';
import * as BaordsActions from '../actions/boards.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private BoardsStore: Store<BoardsState>
  ) {}

  fetchUserOnInitApp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUser),
      mergeMap(() =>
        this.userService.fetchUser().pipe(
          map(currentUser => {
            this.BoardsStore.dispatch(
              BaordsActions.getBoards({ id: currentUser._id })
            );
            return UserActions.setUser({ user: currentUser });
          }),
          catchError(() => of(UserActions.logoutUser()))
        )
      )
    );
  });

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
