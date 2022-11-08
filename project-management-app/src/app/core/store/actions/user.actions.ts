import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

const SET_AUTH = '[User] Set Auth';
const SET_USER = '[User] Set User';
const FETCH_USER = '[User] Fetch User';
const FETCH_USER_FAILED = '[User] Fetch User Failed';
const LOGOUT_USER = '[User] Logout User';
const REMOVE_USER = '[User] Remove User';

export const setAuth = createAction(SET_AUTH, props<{ isAuth: boolean }>());

export const setUser = createAction(SET_USER, props<{ user: User }>());

export const fetchUser = createAction(FETCH_USER);

export const fetchUserFailed = createAction(FETCH_USER_FAILED);

export const logoutUser = createAction(LOGOUT_USER);

export const removeUser = createAction(REMOVE_USER);
