import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenModel, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  constructor(private http: HttpClient) {}

  getToken(user: User): Observable<TokenModel> {
    return this.http.post<TokenModel>(environment.apiUrl + 'signin', user);
   }
}
