import { createReducer, on } from '@ngrx/store';

import { initialUserState, UserState } from '../state/user.state';
import * as UserActions from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(
    UserActions.setAuth,
    (state, { isAuth }): UserState => ({
      ...state,
      isAuth,
    })
  ),
  on(
    UserActions.setUser,
    (state, { user }): UserState => ({
      ...state,
      user,
    })
  )
);
