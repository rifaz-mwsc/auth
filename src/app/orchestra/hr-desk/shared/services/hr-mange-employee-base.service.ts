import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from './../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HrMangeEmployeeBaseService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }




  // GET  /v1​/employee​/search
  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/search?search_value=ali
  // GET /v1​/employee​/overtime-request
  getEmployeeSearch(searchtext) {
    const httpOptions = this.prepareOptions();
    const params = '?search_value=' + searchtext;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/employee/search` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('staffPortalOtRequests', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-desk-employee-base-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-desk-employee-base-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }




  // GET  /v1​/employee​/search
  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/search?search_value=ali
  // GET /v1​/employee​/overtime-request
  getEmployeeSearchById(employeeId) {
    const httpOptions = this.prepareOptions();
    const params = '?employee_id=' + employeeId;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/employee/full-details` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('staffPortalOtRequests', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('staff-portal-overtime-service', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-overtime-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }



  getStaffPortalCalendarEvents(fromDate, todate, employeeId) {
    const httpOptions = this.prepareOptions();
    const params = `?from=${fromDate}&to=${todate}&employee_id=${employeeId}&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true`;
    // const params = `?from=2021-01-01&to=2021-03-03&employee_id=1222&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true`;

    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/calendar-events
    // ?from=2020%2F10%2F01&to=2020%2F12%2F30&show_leave_requests=true&show_overtime_requests=true&show_holidays=true&show_amg_attendances=true&show_sap_attendances=true"

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/employee/calendar` + params, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('staffPortalLeaveRequests', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('staff-portal-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('staff-portal-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
