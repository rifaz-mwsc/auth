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
export class HrAllowanceCustomTimingService {

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


  getAttendanceCustomTimingList() {
    const httpOptions = this.prepareOptions();

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/custom-timings/active/list`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskOvertimeRequests', res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/custom-timings/paged-list?page=1&page_size=10
  getAttendanceCustomTimingListWithFilters(pageNo, pageSize, searchText, plannedDate, deletedItemShow) {
    const httpOptions = this.prepareOptions();
    const params = '?page=' + pageNo + '&page_size=' + pageSize + '&search=' + searchText;
    // const params = '?page=' + pageNo + '&page_size=' + pageSize + '&search=' + searchText + '&planned_date=' + searchText + '&hide_deleted_items=' + searchText;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}custom-timings` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskOvertimeRequests', res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }



  getAttendanceCustomTimingById() {
    const httpOptions = this.prepareOptions();
    const params = '?custom_punch_in_out_timing_id=';

    // v1/overtime-requests?filter_by_sap_upload=false

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}custom-timing` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskOvertimeRequests', res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }



  // {
  //   "allowance_type_name": "Compensatory Allowance",
  //   "allowance_type_is_attendance_based": true
  // }
  postAttendanceCustomTimingNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.hrDeskApiConfig.api_url}custom-timing`, body, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/custom-timing?allowance_type_id=6e75bea0-c130-41f9-b375-08d91e680405
  deleteAttendanceCustomTiming(AttendanceCustomTimingId) {
    const httpOptions = this.prepareOptions();
    const params = '?custom_punch_in_out_timing_id=' + AttendanceCustomTimingId;

    return this._http.delete<any>(`${environment.hrDeskApiConfig.api_url}custom-timing` + params, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
