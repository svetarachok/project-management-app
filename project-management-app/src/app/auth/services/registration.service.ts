import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SignUpResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
 constructor(private http: HttpClient) {}

 signup(user: User): Observable<SignUpResponse> {
  return this.http.post<SignUpResponse>(environment.apiUrl + 'signup', user)
 }
}
