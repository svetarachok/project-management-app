import { createAction, props } from '@ngrx/store';
import { SignUpResponse } from '../../../auth/models/auth.model';

const SET_AUTH = '[User] Set Auth';
const SET_USER = '[User] Set User';

export const setAuth = createAction(SET_AUTH, props<{ isAuth: boolean }>());

export const setUser = createAction(SET_USER, props<{ user: SignUpResponse }>());
