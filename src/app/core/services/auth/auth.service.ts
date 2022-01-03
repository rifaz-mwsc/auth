import { Injectable } from '@angular/core';
// Enviroment
import { environment } from './../../../../environments/environment';
// Services
import { GlobalBaseService } from '../ui-setup/global-base.service';
// Puglins
import { Observable, of } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { DomSanitizer } from '@angular/platform-browser';

import { UiBaseService } from './../ui-setup/ui-base.service';

import { CoreApiAuthService } from './core-api-auth.service';
import { TokenStorageService } from '../token-storage.service';
import {NewAuthService } from "../newauth.service" ;

const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public firstBreed: any;
  public dogsData$: Observable<any>;

  public myAdal8ServicePayload: any;    // Token - adalPayload
  public adalToken: any;                // Token - adalToken
  public myProfile: any;                // Store User Profile Info
  public myProfilePictureBase64: any;   // Store User Image



  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    public adalService: Adal8Service, 
    private http: Adal8HTTPService, 
    private coreApiAuthService: CoreApiAuthService, 
    private tokenStorage: TokenStorageService,
    private _newAuthService : NewAuthService

  ) {
    this.adalInit();
  }

  public adalInit() {
    this.adalService.init(config);
    this.loginUser();
  }

  // public loginUser() {
  //   this.adalService.handleWindowCallback();
  //   if (!this.adalService.userInfo.authenticated) {
  //     this.adalService.login();
  //     this.setAdal8Service(this.adalService);
  //     this.coreApiAuthService.postGetCoreApiToken(this.adalService.userInfo.token, 'hr_desk_angular');
  //   } else {
  //     this.setAdal8Service(this.adalService);
  //     this.coreApiAuthService.postGetCoreApiToken(this.adalService.userInfo.token, 'hr_desk_angular');
  //     this.getMyProfile();
  //   }
  // }
  public loginUser() {
    this.adalService.handleWindowCallback();
    if (!this.adalService.userInfo.authenticated) {
      this.adalService.login();
      // this.setAdal8Service(this.adalService);
      // this._newAuthService.login(this.adalService.userInfo.token).subscribe( data=> {
      //   console.log("New Service reponse", data);
      //   this.tokenStorage.saveToken(data.access_token);
      //   this.tokenStorage.saveUser(data);
      //   this.tokenStorage.saveRefreshToken(data.refreshToken);
        
      //   this.isLoginFailed = false;
      //   this.isLoggedIn = true;
      //   this.roles = this.tokenStorage.getUser().roles;
      //   this.reloadPage();

      // }, err => {
      //   this.errorMessage = err;
      //   console.log("_newAuthService err", err);
        
      // })
    } else {

      this.setAdal8Service(this.adalService);
      this._newAuthService.login(this.adalService.userInfo.token).subscribe( data=> {
        console.log("New Service reponse", data);
        console.log("New Service reponse tokeExp",new Date(data.access_token_expires_on));
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      }, err => {
        this.errorMessage = err;
        console.log("New Service reponse err", err);
        
      })
    }
    
  }

  reloadPage(): void {
    window.location.reload();
  }
















  public getDummyData() {
    // this.dogsData$ = this.http.get('https://dog.ceo/api/breeds/list', { observe: 'response' })
    //   .map(response => response.body);

    // const sub = this.dogsData$.subscribe(data => {
    //   this.firstBreed = data.message[0];
    // });

    this.dogsData$ = this.http.get('https://dog.ceo/api/breeds/list', { observe: 'response' }).pipe(map(response => response.body));
    const sub = this.dogsData$.subscribe(result => {
      // console.log('getDummyData: ', result);
      this.firstBreed = result.message[0];
    });
  }


  // Logout Method
  public logout() {
    localStorage.clear();
    this.adalService.init(environment.adalConfig);
    // console.log('Logging Out');
    this.adalService.logOut();
    this.tokenStorage.signOut();
  }


  convertTimestamptoTime(unixTimestampMy) {
    var unixtimestamp = unixTimestampMy;        // Unixtimestamp
    // Months array
    var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date(unixtimestamp * 1000);  // Convert timestamp to milliseconds
    var year = date.getFullYear();              // Year
    var month = months_arr[date.getMonth()];    // Month
    var day = date.getDate();                   // Day
    var hours = date.getHours();                // Hours
    var minutes = "0" + date.getMinutes();      // Minutes
    var seconds = "0" + date.getSeconds();      // Seconds

    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
  }

  getNowDateTimeStr() {
    var now = new Date();
    var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);

    var convertedDateTime = [
      [this.AddZero(now.getDate()), this.AddZero(now.getMonth() + 1), now.getFullYear()].join('/'),
      [this.AddZero(hour), this.AddZero(now.getMinutes())].join(':'), now.getHours() >= 12 ? 'PM' : 'AM'].join(' ');

    return convertedDateTime;
  }

  AddZero(num) {
    return (num >= 0 && num < 10) ? '0' + num : num + '';
  }

  public setAdal8Service(adalPayload: any) {
    this.myAdal8ServicePayload = adalPayload;
    this.setlocalStorageToken(this.myAdal8ServicePayload);    // localStorage
  }

  public getAdal8Service() {
    if (!this.myAdal8ServicePayload.userInfo.authenticated) {
      this.getlocalStorageToken();                            // localStorage
    }
    return this.myAdal8ServicePayload;
  }


  public renewToken() {
    console.log('handleWindowCallback', this.adalService.refreshDataFromCache());
    this.adalService.refreshDataFromCache();
    var token = this.adalService.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      // console.log('renewToken :::>> Token', token);
      // this.setToken(token);
    });
  }


  public getlocalStorageToken() {
    return new Promise(resolve => {
      this.adalToken = localStorage.getItem('adalToken');
      if (this.adalToken) {
        // console.log('getToken :::>> Token Resolved');
        resolve(this.adalToken);
      } else {
        // console.log('getToken :::>> No token');
      }
    });
  }


  public setlocalStorageToken(adalToken) {
    return new Promise(resolve => {
      this.adalToken = localStorage.setItem('adalToken', (adalToken));
      if (this.adalToken) {
        // console.log('setToken :::>> Token Resolved');
        resolve(this.adalToken);
      } else {
        // console.log('setToken :::>> No token');
      }
    });
  }


  public getMyProfile() {
    // return new Promise(resolve => {
    //   this.global.getMyDetails().subscribe(data => {
    //     this.myProfile = data;
    //     localStorage.setItem('localStorageMyProfile', JSON.stringify(data));
    //     // console.log ('Profile', this.myProfile.Id);
    //     this.global.getUserPictureBase64(this.myProfile.Id).subscribe((base64: string) => {
    //       this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
    //       localStorage.setItem('myProfilePictureBase64', base64);
    //     });
    //     resolve(this.myProfile);
    //     console.log(this.myProfile);
    //   });
    // });
  }


}
