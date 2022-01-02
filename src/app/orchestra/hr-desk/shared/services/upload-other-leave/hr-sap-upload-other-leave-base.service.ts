import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
// import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
// import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
// import { environment } from './../../../../../environments/environment';
import { environment } from './../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrSapUploadOtherLeaveBaseService {

  constructor(private http: HttpClient) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }

  getHRDeskHoliday() {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      // const httpOptions = this.prepareOptions();
      return this.http.get<any>(`${environment.devJsonApiConfig.api_json_server_url}v1/holidays`)
        .pipe(map(res => {
          localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
          // this.userAccountsSubject.next(accountData);
          // console.log('accountData', accountData);
          return res;
        },
          catchError((error: any) => {
            console.log('e-service-profile-service -> error', error);
            // this.formatErrors(error);
            return throwError(error || 'Server error');
          })
        ));

    } else {
      // MWSC - Dev & Live API Server
      const httpOptions = this.prepareOptions();
      return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/holidays`, httpOptions)
        .pipe(map(res => {
          // this.accountList = res;
          localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
          // this.userAccountsSubject.next(accountData);
          // console.log('accountData', accountData);
          return res;
        },
          catchError((error: any) => {
            console.log('e-service-profile-service -> error', error);
            // this.formatErrors(error);
            return throwError(error || 'Server error');
          })
        ));
    }
  }
}
