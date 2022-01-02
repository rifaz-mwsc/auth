import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
// import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
// import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
// import { environment } from './../../../../../environments/environment';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HrOtRequestsBaseService {

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


  getHRDeskOvertimeRequests() {
    const httpOptions = this.prepareOptions();
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-requests`, httpOptions)
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

  getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, duration, sapUploadStatus, supvApproval, division, department, section) {
    const httpOptions = this.prepareOptions();

    // if (empoyeeId == null || typeof empoyeeId === 'undefined') {

    // } else {

    // }

    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&filter_by_employee_id=' + empoyeeId +
        '&filter_by_dutration=' + duration +
          '&filter_by_sap_upload=' + sapUploadStatus +
            '&filter_by_approval=' + supvApproval +
              '&filter_by_division=' + division +
                '&filter_by_department=' + department;

    // https://hr-desk-api-dev-01.mwsc.com.mv/v1/overtime-requests?filter_by_employee_id=gjgj&filter_by_dutration=12%2F12%2F2020&filter_by_division=gjgj&filter_by_department=gjgj&page=1&page_size=10

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-requests` + params, httpOptions)
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

  getHRDeskPendingOvertimeRequests() {
    const httpOptions = this.prepareOptions();
    const params = '?filter_by_sap_upload=false';

    // v1/overtime-requests?filter_by_sap_upload=false

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/pending-overtime-request-sap-upload` + params, httpOptions)
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

  getHRDeskPendingOvertimeRequestsWithFilters(pageNo, pageSize, searchText, overtimeDate) {
    const httpOptions = this.prepareOptions();
    const params = `?page=${pageNo}&page_size=${pageSize}&search=${searchText}&filter_by_date=${overtimeDate}`;
    // const params = '?filter_by_sap_upload=false';
    // v1/overtime-requests?filter_by_sap_upload=false

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/pending-overtime-request-sap-upload` + params, httpOptions)
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


  getHRDeskOtRequestDetailsByOtId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?leave_request_id=' + requestId;
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-desk-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-desk-leave-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  // POST  /v1​/overtime-request​/extend-expiry
  // {
  //   "overtime_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "overtime_request_new_expiry_date": "2020-12-04T21:31:29.140Z"
  // }
  postHRDeskExtendOvertimeRequests(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/extend-expiry`, body, httpOptions)
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



  async postAsyncHRDeskExtendOvertimeRequests(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/extend-expiry`, body, httpOptions)
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



  // POST  /v1​/overtime-request​/extend-expiry
  // {
  //   "overtime_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "overtime_request_new_expiry_date": "2020-12-04T21:31:29.140Z"
  // }
  postHRDeskSAPUploadOvertimeRequests(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/overtime-request-sap-upload`, body, httpOptions)
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


 // POST    /v1​/overtime-request​/reject
  // {
  //   "leave_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "leave_request_rejection_reason": "string"
  // }
  postHRDeskOvertimeRequestReject(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/reject`, body, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('hr-desk-leave-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-desk-leave-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
