import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TokenModel, NewUser } from '../models/auth.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../core/store/state/user.state';

import * as UserActions from '../../core/store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class GetTokenService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<UserState>
  ) {}

  login(user: NewUser): Observable<void> {
    return this.http.post<TokenModel>(environment.apiUrl + 'signin', user).pipe(
      map(({ token }) => {
        localStorage.setItem('team4-token', token);
        this.store.dispatch(UserActions.setAuth({ isAuth: true }));
        this.router.navigateByUrl('/');
      })
    );
  }
}
