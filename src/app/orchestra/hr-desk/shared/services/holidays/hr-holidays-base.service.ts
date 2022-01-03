import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
// import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
// import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
// import { environment } from './../../../../../environments/environment';
import { environment } from './../../../../../../environments/environment';
import { NewAuthService } from 'src/app/core/services/newauth.service';


@Injectable({
  providedIn: 'root'
})
export class HrHolidaysBaseService {

  constructor(private http: HttpClient, private newAuthServive : NewAuthService) { }

  // private prepareOptions(): any {
  //   let headers = new HttpHeaders();
  //   let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
  //   headers = headers
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', '*/*')
  //     .set('Authorization', `Bearer ${token.access_token}`);
  //   console.log('headers', headers);
  //   return { headers };
  // }

  getHRDeskHoliday() {
    // MWSC - Dev & Live API Server
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/holidays`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('holiday-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskHolidayWithFilters(pageNo, pageSize, searchText) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&search=' + searchText.toString();;


    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/holidays` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('holiday-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskCreateHoliday(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/holiday/add`, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('holiday-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskRemoveHoliday(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
        // const body = JSON.stringify(data);
    const params = '?holiday_id=' + data;

    return this.http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/holiday/remove` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('holiday-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
