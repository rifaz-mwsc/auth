import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
// import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
// import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
// import { environment } from './../../../../../environments/environment';
import { environment } from './../../../../../environments/environment';
import { NewAuthService } from 'src/app/core/services/newauth.service';


@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsBaseService {

  constructor(private http: HttpClient, private newAuthServive : NewAuthService) { }

  // private prepareOptions(): any {
  //   let headers = new HttpHeaders();
  //   let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
  //   headers = headers
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', `Bearer ${token.access_token}`);
  //   // console.log('headers', headers);
  //   return { headers };
  // }

  getHRDeskLeaveRequests() {
    // const httpOptions = this.prepareOptions();
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-requests`, httpOptions)
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







  getHRDeskLeaveRequestsWithFilters(pageNo, pageSize, empoyeeId, absenceType, division, department, section) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&filter_by_employee_id=' + empoyeeId +
      '&filter_by_absence_type_sap_id=' + absenceType +
      '&filter_by_division=' + division +
      '&filter_by_department=' + department;


    // filter_by_pending_sap_upload
    // filter_by_year
    // filter_by_month

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-requests` + params, httpOptions)
      .pipe(map(res => {

        console.log('hr-desk-leave-service -> api-link', `${environment.hrDeskApiConfig.api_url}v1/leave-requests` + params);


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

  getHRDeskLeaveRequestDetailsByLeaveId(leaveId) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params = '?leave_request_id=' + leaveId;
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





  // /v1/shorten-leave-request
  getHRDeskShortenLeaveRequestDetailsByLeaveId(leaveId) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params = '?leave_request_id=' + leaveId;
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/shorten-leave-request` + params, httpOptions)
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




  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/shorten-leave-requests
  // ?filter_by_absence_type_sap_id=fhfh
  // &filter_by_employee_id=fhfhfh
  // &filter_by_division=fhfh
  // &filter_by_department=fhfhf
  // &filter_by_section=fhfhf
  // &filter_by_year=2021
  // &filter_by_month=12
  // &page=1
  // &page_size=10

  getHRDeskLeaveShortenRequestsWithFilters(pageNo, pageSize, empoyeeId, absenceType, division, department, section, year, month) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&filter_by_employee_id=' + empoyeeId +
      '&filter_by_absence_type_sap_id=' + absenceType +
      '&filter_by_division=' + division +
      '&filter_by_department=' + department +
      '&filter_by_section=' + section +
      '&filter_by_year=' + year +
      '&filter_by_month=' + month;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/shorten-leave-requests` + params, httpOptions)
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





  getHRDeskPendingLeaveRequests() {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/pending-leave-request-sap-upload`, httpOptions)
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

  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/leave-request/pending-leave-request-sap-upload
  // ?filter_by_absence_type_sap_id=9001&page=1&page_size=10&search=test
  getHRDeskPendingLeaveRequestsWithFilters(pageNo, pageSize, searchText, leaveTypeId) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params = `?page=${pageNo}&page_size=${pageSize}&search=${searchText}&filter_by_absence_type_sap_id=${leaveTypeId}`;
    // const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/pending-leave-request-sap-upload` + params, httpOptions)
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

  // V2
  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/leave-request/pending-leave-request-sap-upload
  // ?filter_by_absence_type_sap_id=9001&page=1&page_size=10&search=test
  getHRDeskPendingLeaveRequestsWithFiltersV2(pageNo, pageSize, searchText, leaveTypeId) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const params = `?page=${pageNo}&page_size=${pageSize}&search=${searchText}&filter_by_absence_type_sap_id=${leaveTypeId}`;
    // const params = `?page=${pageNo}&page_size=${pageSize}`;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v2/leave-request/pending-leave-request-sap-upload` + params, httpOptions)
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










  postHRDeskExtendLeaveRequests(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/extend-expiry`, body, httpOptions)
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


  // POST https://hr-desk-api-dev-01.mwsc.com.mv/v1/leave-request/approve-shorten?leave_request_id=3fa85f64-5717-4562-b3fc-2c963f66afa6

  // POST https://hr-desk-api-dev-01.mwsc.com.mv/v1/leave-request/approve-shorten?leave_request_id=d66491b0-0e14-4262-d6c2-08d954df2df1

  // POST https://hr-desk-api-dev-01.mwsc.com.mv/v1/leave-request/approve-shorten?leave_request_id=d66491b0-0e14-4262-d6c2-08d954df2df1

  // POST   /v1/leave-request/approve-shorten
  postHRDeskApproveShortenLeaveRequests(leaveId) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    // const body = JSON.stringify(data);
    const params = `?leave_request_id=${leaveId}`;

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/approve-shorten` + params, {}, httpOptions)
      // return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/approve-shorten`, body, httpOptions)
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


  // POST   /v1/leave-request/reject-shorten
  postHRDeskRejectShortenLeaveRequests(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/reject-shorten`, body, httpOptions)
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



  postHRDeskSAPUploadLeaveRequests(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/sap-upload`, body, httpOptions)
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



  // POST    /v1​/leave-request​/reject
  // {
  //   "leave_request_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "leave_request_rejection_reason": "string"
  // }
  postHRDeskLeaveRequestReject(data) {
    const httpOptions = this.newAuthServive.prepareOptionsForEndpoints();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/leave-request/reject`, body, httpOptions)
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
