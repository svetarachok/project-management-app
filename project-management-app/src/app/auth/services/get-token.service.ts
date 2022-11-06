import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TokenModel, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(user: User): Observable<void> {
    return this.http.post<TokenModel>(environment.apiUrl + 'signin', user).pipe(map(({ token }) => {
      localStorage.setItem('team4-token', token);
      this.router.navigateByUrl('/');
    }))
   }
}
