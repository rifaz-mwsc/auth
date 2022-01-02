import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Adal8Service} from 'adal-angular8';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private adalSvc: Adal8Service) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check to see if a user has a valid JWT
    // if (this.adalSvc.userInfo !== undefined && this.adalSvc.userInfo.authenticated) {
    if (this.adalSvc.userInfo.authenticated) {
      console.log('AuthGuard', 'ok');
      return true;
    } else {
      console.log('AuthGuard', 'not so ok');
      // If not, they redirect them to the login page
      // this.router.navigate(['/login']);
      // this.router.navigate(['/error-login-time-out'], { queryParams: { returnUrl: state.url } });
      // this.adalSvc.login();
      // this.router.navigate(['/error-login-time-out']);
      this.router.navigate(['/error-login-time-out'], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
