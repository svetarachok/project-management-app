/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ExpCheckGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.userService.getTokenFromLS();

    if (token) {
      const decodedToken = this.userService.getInfoFromToken(token);

      if (!decodedToken) {
        this.userService.logout();
        return this.router.parseUrl('/welcome');
      }

      const isTokenExpire = this.userService.tokenExpirationCheck(
        decodedToken.exp
      );

      if (isTokenExpire) {
        this.userService.logout();
        return this.router.parseUrl('/welcome');
      }

      return true;
    }

    return this.router.parseUrl('/welcome');
  }
}
