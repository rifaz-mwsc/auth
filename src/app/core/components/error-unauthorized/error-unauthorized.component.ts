import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { UiBaseService } from './../../services/ui-setup/ui-base.service';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Adal8Service } from 'adal-angular8';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../environments/environment';


const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent implements OnInit {

  profileName: any;
  profilePicture: any;

  displayName: any;
  displayPicture: any;

  constructor(
    private router: Router,
    private uiBaseService: UiBaseService,
    private authService: AuthService,
    public adalService: Adal8Service,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getDisplayProfile();
  }


  getDisplayProfile() {
    this.profileName = JSON.parse(localStorage.getItem('myProfile'));
    this.profilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('myProfilePicture'));

    this.displayName = JSON.parse(localStorage.getItem('displayName'));
    this.displayPicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('displayPicture'));
  }


  unlock() {
    if (this.adalService.userInfo.authenticated) {
      this.router.navigate(['/home']);
    } else {
      this.adalInit().then(data => {
        return new Promise(resolve => {
          const adalConfig = this.uiBaseService.getAppConfigData();
          resolve(adalConfig);
        });
      });
    }
  }


  adalInit() {
    return new Promise(resolve => {
      const adalConfig = this.authService.loginUser();
      resolve(adalConfig);
    });
  }


}
