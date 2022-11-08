import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface DecodedTokenModel {
  userId: string;
  name: string;
  login: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  fetchUser(): Observable<User> {
    const token = this.getTokenFromLS();
    if (token) {
      const decodedToken = this.getInfoFromToken(token);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http.get<User>(
        environment.apiUrl + `users/${decodedToken?.userId}`,
        httpOptions
      );
    }

    return throwError(() => new Error('Wrong token or userId!'));
  }

  logout(): void {
    localStorage.removeItem('team4-token');
    this.router.navigateByUrl('/auth');
  }

  getInfoFromToken(token: string): DecodedTokenModel | null {
    try {
      return jwt_decode<DecodedTokenModel>(token);
    } catch {
      return null;
    }
  }

  getTokenFromLS(): string | null {
    return localStorage.getItem('team4-token');
  }
}
