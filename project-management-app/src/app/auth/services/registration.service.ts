import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { NewUser } from '../models/auth.model';
import { User } from '../../user/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  signup(user: NewUser): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'signup', user);
  }
}
