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
export class HrAuthorizationService {

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

  private prepareOptionsFileUpload(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }


  getHRDeskAuthorizationsWithFilters(pageNo, pageSize, assignedEmployee, validDate, dashbaordType) {
    console.log('getHRDeskAuthorizationsWithFilters', 'Test');
    const httpOptions = this.prepareOptions();
    // const params = '?page=' + pageNo + '&page_size=' + pageSize;
    const params = '?page=' + pageNo + '&page_size=' + pageSize + '&filter_by_assign_user=' + assignedEmployee + '&filter_by_valid_date=' + validDate + '&filter_by_organization_dashboard_type=' + dashbaordType;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorizations` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskAuthorizationsWithFilters', res);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskAuthorizationById(documentId) {
    console.log('getHRDeskAuthorizationById', 'Test');
    const httpOptions = this.prepareOptions();
    const params = '?dashboard_id=' + documentId;
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskAuthorizationById', res);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskCreateAuthorization(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization`, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  putHRDeskRemoveAuthorization(dashboardId) {
    console.log('authorization-service -> params ', dashboardId);
    const httpOptions = this.prepareOptions();
    const params = '?dashboard_id=' + dashboardId;

    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/remove` + params, {}, httpOptions)
      // return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/remove` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  xputHRDeskSetValidityAuthorization(dashboardId, validFrom, validTo) {
    console.log('authorization-service -> params ', dashboardId + " validFrom " + validFrom + " validTo " + validTo);
    const httpOptions = this.prepareOptions();
    const params = '?dashboard_id=' + dashboardId + '&valid_from=' + validFrom + '&valid_to=' + validTo;

    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/update-validity` + params, {}, httpOptions)
      // return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/set-expiry` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  putHRDeskSetValidityAuthorization(data) {
    const body = JSON.stringify(data);
    const httpOptions = this.prepareOptions();
    console.log('putHRDeskSetValidityAuthorization -> body', body);

    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/update-validity`, body, httpOptions)
      // return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/set-expiry` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }




  putHRDeskSetAsDefaultAuthorization(dashboardId) {
    console.log('authorization-service -> params ', dashboardId);
    const httpOptions = this.prepareOptions();
    const params = '?dashboard_id=' + dashboardId;

    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/set-default` + params, {}, httpOptions)
      // return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard-authorization/set-default` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('authorization-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
