import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './registration.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface TokenModel {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor(private http: HttpClient) {}

  getToken(user: User): Observable<TokenModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    return this.http.post<TokenModel>(environment.apiUrl + 'signin', user, httpOptions);
   }
}
