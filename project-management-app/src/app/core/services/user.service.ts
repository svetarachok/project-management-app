import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import jwt_decode from 'jwt-decode';

interface DecodedTokenModel {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(): Observable<User> {
    const token = this.getTokenFromLS();
    if (!token) {
      return throwError(() => new Error('User is not authorized!'));
    }

    const decodedToken = this.getInfoFromToken(token);

    if (!decodedToken) {
      return throwError(() => new Error('Bad token!'));
    }

    const isTokenExpire = this.tokenExpirationCheck(decodedToken.exp);

    if (isTokenExpire) {
      return throwError(() => new Error('Token expired!'));
    }

    return this.http.get<User>(`/users/${decodedToken?.id}`);
  }

  clearToken(): void {
    localStorage.removeItem('team4-token');
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

  tokenExpirationCheck(timestamp: number) {
    const currentDate = new Date();
    const tokenDateExp = new Date(timestamp * 1000);
    return tokenDateExp < currentDate;
  }
}
