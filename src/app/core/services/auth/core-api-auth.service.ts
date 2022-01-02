import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreApiAuthService {

  yodaCoreApiToken: any;
  yodaCoreApiTokenFromStorage: any;
  yodaCoreApiTokenExpiresOn: any;

  constructor(private http: HttpClient) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json');
    return { headers };
  }

  postGetCoreApiToken(azureToken, azureDevice) {
    this.postCoreApiToken(
      {
        azure_token: azureToken,
        device: azureDevice,
      }
    ).subscribe(value => {
      return value;
    }, (error: Response | any) => {
      console.log('error', error);
      return throwError(new Error(error.status));
    });
  }

  postCoreApiToken(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/auth/login-using-azure-adal`, body, httpOptions)
      .pipe(map(userData => {
        console.log('postCoreApiToken userData', userData);
        localStorage.setItem('yodaCoreApiToken', JSON.stringify(userData));
        return userData;
      },
        catchError((error: any) => {
          console.log('postCoreApiToken azureToken', error);
          return throwError(error || 'Server error');
        })
      ));
  }



  postGetCoreApiTokenRefresh(yodaCoreApiToken, yodaCoreApiRefreshToken) {
    this.postCoreApiToken(
      {
        access_token: yodaCoreApiToken,
        refresh_token: yodaCoreApiRefreshToken,
      }
    ).subscribe(value => {
      return value;
    }, (error: Response | any) => {
      console.log('error', error);
      return throwError(new Error(error.status));
    });
  }


  postCoreApiTokenRefresh(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/auth/login-using-refresh-token`, body, httpOptions)
      .pipe(map(userData => {
        console.log('postCoreApiTokenRefresh userData', userData);
        localStorage.removeItem('yodaCoreApiToken');
        localStorage.setItem('yodaCoreApiToken', JSON.stringify(userData));
        return userData;
      },
        catchError((error: any) => {
          console.log('postCoreApiToken azureToken', error);
          return throwError(error || 'Server error');
        })
      ));
  }




  public getlocalStorageToken() {
    return new Promise(resolve => {
      this.yodaCoreApiToken = localStorage.getItem('yodaCoreApiToken');
      if (this.yodaCoreApiToken === undefined || this.yodaCoreApiToken == null || this.yodaCoreApiToken.length <= 0) {
        const error = '404 not Found -> Yoda Core Api Token not Found';
        resolve(error);
      } else {
        resolve(this.yodaCoreApiToken);
      }
    });
  }


  public setlocalStorageToken(yodaCoreApiToken) {
    return new Promise(resolve => {
      this.yodaCoreApiToken = localStorage.setItem('yodaCoreApiToken', (yodaCoreApiToken));
      if (this.yodaCoreApiToken === undefined || this.yodaCoreApiToken == null || this.yodaCoreApiToken.length <= 0) {
        const error = '404 not Found -> Yoda Core Api Token not Found';
        resolve(error);
      } else {
        resolve(this.yodaCoreApiToken);
      }
    });
  }


  public getYodaCoreApiToken() {
    return new Promise(resolve => {
      this.yodaCoreApiTokenFromStorage = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
      console.log('getYodaCoreApiToken -> yodaCoreApiTokenFromStorage', this.yodaCoreApiTokenFromStorage)
      let yodaCoreApiTokenExpiresOn = new Date(this.yodaCoreApiTokenFromStorage.access_token_expires_on);
      let currentTime = new Date();

      if (this.yodaCoreApiTokenFromStorage === undefined || this.yodaCoreApiTokenFromStorage == null || this.yodaCoreApiTokenFromStorage.length <= 0) {
        const error = '404 not Found -> Yoda Core Api Token not Found';
        resolve(error);
      } else {
        console.log('getYodaCoreApiToken -> yodaCoreApiTokenFromStorage : ', this.yodaCoreApiTokenFromStorage);
        console.log('getYodaCoreApiToken ->     access_token_expires_on : ', this.yodaCoreApiTokenFromStorage.access_token_expires_on);
        console.log('getYodaCoreApiToken ->                  Expires On : ', yodaCoreApiTokenExpiresOn);
        console.log('getYodaCoreApiToken ->                Current Time : ', currentTime);
        if (yodaCoreApiTokenExpiresOn <= currentTime) {
          console.log('getYodaCoreApiToken ->      Expired : ', this.yodaCoreApiTokenFromStorage);
          console.log('getYodaCoreApiToken -> Current Time : ', currentTime);
          this.yodaCoreApiToken = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
        } else {
          this.postCoreApiTokenRefresh(
            {
              access_token: this.yodaCoreApiTokenFromStorage.access_token,
              refresh_token: this.yodaCoreApiTokenFromStorage.refresh_token,
            }
          ).subscribe(value => {
            this.yodaCoreApiToken = value;
            localStorage.removeItem('yodaCoreApiToken');
            localStorage.setItem('yodaCoreApiToken', JSON.stringify(value));
            console.log('postCoreApiTokenRefresh -> yodaCoreApiToken : ', this.yodaCoreApiToken);
            return this.yodaCoreApiToken;
          }, (error: Response | any) => {
            console.log('error', error);
            return throwError(new Error(error.status));
          });
        }
        resolve(this.yodaCoreApiToken);
      }
    });
  }
}
