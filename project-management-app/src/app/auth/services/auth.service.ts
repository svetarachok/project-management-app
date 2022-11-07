import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenModel, NewUser } from '../models/auth.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../core/store/state/user.state';
import { User } from '../../core/models/user.model';

import * as UserActions from '../../core/store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<UserState>) {}

  signup(user: NewUser): Observable<User> {
    return this.http
      .post<User>(environment.apiUrl + 'signup', user)
      .pipe(
        tap(newUser =>
          this.store.dispatch(UserActions.setUser({ user: newUser }))
        )
      );
  }

  login(user: NewUser): Observable<void> {
    return this.http.post<TokenModel>(environment.apiUrl + 'signin', user).pipe(
      map(({ token }) => {
        localStorage.setItem('team4-token', token);
        this.store.dispatch(UserActions.setAuth({ isAuth: true }));
      })
    );
  }
}
