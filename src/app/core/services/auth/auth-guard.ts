import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Adal8HTTPService, Adal8Service , Adal8Interceptor, Adal8User} from 'adal-angular8';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor( private router: Router, private adalSvc: Adal8Service) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.adalSvc.userInfo.authenticated) {
      return true;
    } else {
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.router.navigate(['/error-login-time-out'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
