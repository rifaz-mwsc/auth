import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

import { AuthService } from './core/services/auth/auth.service';
import { UiBaseService } from './core/services/ui-setup/ui-base.service';

import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { TokenStorageService } from "../app/core/services/token-storage.service";
import { EventBusService } from '../app/core/services/_shared/event-bus.service';
import { Subscription } from 'rxjs';

const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'WebApps V3';
  // Environment Config
  public appEnv: any;
  public apiEnv: any;
  public typeEnv: any;
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private uiBaseService: UiBaseService,
    private authService: AuthService,
    public adalService: Adal8Service,
    private tokenStorageService: TokenStorageService,
    private eventBusService : EventBusService) {
    // console.log('(AppComp) Env Prod:', environment.production); // Logs false for default environment
    // this.adalService.init(config);

    this.appEnv = environment.api_server;
    this.apiEnv = environment.api_url;
    this.typeEnv = environment.production;
    // console.log('applicationEnvironmentServer', this.appEnv);
    // console.log('applicationEnvironmentServer', this.apiEnv);

    // setTimeout(() => {
    //   this.adalInit();
    // }, 2000);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.name;
      console.log('New Service reponse - userName: ',  this.username);
      
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.adalService.init(config);
    this.adalInit().then(data => {

      return new Promise(resolve => {
        const adalConfig = this.uiBaseService.getAppConfigData();
        resolve(adalConfig);
        // console.log('My Peers', adalConfig);
      });

    });
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    window.location.reload();
  }
  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }
  adalInit() {
    return new Promise(resolve => {
      const adalConfig = this.authService.loginUser();
      resolve(adalConfig);
      // console.log('My Peers', adalConfig);
    });
  }


}
