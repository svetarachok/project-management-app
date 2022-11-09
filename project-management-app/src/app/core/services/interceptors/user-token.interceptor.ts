import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token = this.userService.getTokenFromLS();
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmFhOTljMTgyNTY1MTVjMGVmN2QwZCIsImxvZ2luIjoic3ZldGFAdGVzdC5jb20iLCJpYXQiOjE2Njc5MzY3ODAsImV4cCI6MTY2Nzk3OTk4MH0.uonBoDrxj8IOm9DkKMovqvm2Rvtl9_1svNSIVAdyPPw';
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(req);
  }
}
