import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OWFjYjM2Zi00YzE3LTQwOGMtYTQ2NS1kMjViOGI2NzVjYTQiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2Njc3NDAyNzZ9.gxu4ffdcvdQvtn7atPlIgkJvkA3fQRfP56hTsi3gW4c';
    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(req);
  }
}
