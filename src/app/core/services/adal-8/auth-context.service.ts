import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { Observable, throwError, Observer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { AppComponent } from './../../../app.component';


// import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';


// import { AdalService, AuthHttp, OAuthData } from 'ng2-adal/services';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor, Adal8User } from 'adal-angular8';

import { AuthService } from '../../../core/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthContextService {
  // public userInfo: OAuthData;
  public userInfo: Adal8User;

  // Get AppComponent
  adal8ServiceObj: any;

  constructor(
    private adalService: Adal8Service,
    private adalHttp: Adal8HTTPService, private appComponent: AppComponent, private authService: AuthService) {
    this.adalService.init(this.adalConfig);
    this.adalService.handleWindowCallback();
    if (this.adalService.userInfo.authenticated) {
      this.userInfo = this.adalService.userInfo;
    }
  }

  public handleWindowCallback() {
    this.adalService.handleWindowCallback();
  }


  //   get(url: string, options: {
  //     body?: any;
  //     headers?: HttpHeaders;
  //     reportProgress?: boolean;
  //     observe: 'response';
  //     params?: HttpParams | {
  //         [param: string]: string | string[];
  //     };
  //     responseType?: 'json';
  //     withCredentials?: boolean;
  // }): Observable<any>;

  public getUser(): Observable<any> {
    const options = this.prepareOptions();
    // return this.adalHttp.get('/api/admin').map((response: Response) => response.json());
    return this.adalHttp.get(environment.devJsonApiConfig.api_json_server_url, options).pipe(catchError(this.handleError));
  }



  private get adalConfig(): any {
    return {
      // SINGLE TENANT SUPPORT, IF NOT SPECIFIED IT IS MULT
      tenant: 'mwscnet.onmicrosoft.com',
      clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
      popUp: false,
      // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
      postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://localhost:4200/login',
      navigateToLoginRequestUrl: true,
    };
  }

  login() {
    this.adalService.login();
  }
  logOut() {
    this.adalService.logOut();
  }


  // ------------------------------------------------------------------------------

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    this.adal8ServiceObj = this.authService.getAdal8Service();

    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);

    console.log('headers', headers);

    return { headers };
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      console.log('API Error', errorMessage);
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log('API Error', errorMessage);
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
