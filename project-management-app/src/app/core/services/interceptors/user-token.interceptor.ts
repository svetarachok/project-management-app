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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZTE1MTlmYi0yNjQ1LTRhZjAtODY5NS01YzkyZDdlY2VlMTciLCJsb2dpbiI6InVzZXIwMDIiLCJpYXQiOjE2Njc3NDU3MjF9.whiJFXiJ-ILsNEM8t_GXlT_TGvVf5ZAnsgWnuIU_sQM';
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
      return next.handle(req);
  }
}
