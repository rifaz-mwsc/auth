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
export class HrSapUploadAnnualLeaveBaseService {

  constructor(private http: HttpClient) { }

  private prepareOptions(searchParams): any {
    let headers = new HttpHeaders();
    // const params = new HttpParams();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));

    const params = new HttpParams()
      .set('filter_by_absence_type_sap_id', searchParams.filter_by_absence_type_sap_id);
    // .set('page', searchParams.page)
    // .set('page_size', searchParams.page_size)
    // .set('search', searchParams.search);

    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers, params };
  }

  getHRDeskSapUploadAnnualLeavex(searchParams) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      // const httpOptions = this.prepareOptions();
      return this.http.get<any>(`${environment.devJsonApiConfig.api_json_server_url}/v1/leave-request/pending-leave-request-sap-upload`)
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
      const httpOptions = this.prepareOptions(searchParams);
      return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}/v1/leave-request/pending-leave-request-sap-upload`, httpOptions)
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


  getHRDeskSapUploadAnnualLeave(searchParams) {
    // MWSC - Dev & Live API Server
    const httpOptions = this.prepareOptions(searchParams);
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/pending-leave-request-sap-upload`, httpOptions)
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
