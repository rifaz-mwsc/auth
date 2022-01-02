import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from './../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrEmployeeStatisticsBaseService {

  devJsonAPI: boolean = true;

  constructor(private _http: HttpClient) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }


  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/employee-statistics/overtime-calculator?employee_id=1222&from_date=12%20Aug%202021&to_date=13%20Aug%202021
  getStatistics(employeeId, fromDate, toDate) {
    const httpOptions = this.prepareOptions();
    const params = '?employee_id=' + employeeId + '&from_date=' + fromDate + '&to_date=' + toDate;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/employee-statistics/for-year` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getStatistics', res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  
  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/employee-statistics/overtime-calculator?employee_id=1222&from_date=12%20Aug%202021&to_date=13%20Aug%202021
  getOvertimeCalculation(employeeId, fromDate, toDate) {
    const httpOptions = this.prepareOptions();
    const params = '?employee_id=' + employeeId + '&from_date=' + fromDate + '&to_date=' + toDate;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/employee-statistics/overtime-calculator` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getOvertimeCalculation', res);
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
