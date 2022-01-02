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
export class HrAllowanceRecordService {

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

  getAllowanceRecordList() {
    const httpOptions = this.prepareOptions();

    if(this.devJsonAPI == true){
      return this._http.get<any>(`${environment.devJsonApiConfig.api_json_server_url}v1/allowance-type`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getAllowanceRecordList', res);
        return res;
      },
        catchError((error: any) => {
          console.log('e-service-profile-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
    } else {
      return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-requests`, httpOptions)
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
  }


  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/allowance-management/allowance-records/paged-list?page=1&page_size=10&filter_by_employee_id=1222
  getAllowanceRecordListWithFilters(pageNo, pageSize, searchText) {
    const httpOptions = this.prepareOptions();
    // const params = '?page=' + pageNo +'&page_size=' + pageSize+'&filter_by_name=' + searchText;
    const params = '?page=' + pageNo + '&page_size=' + pageSize;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/allowance-records/paged-list` + params, httpOptions)
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

  getAllowanceRecordById() {
    const httpOptions = this.prepareOptions();
    const params = '?filter_by_sap_upload=false';

    // v1/overtime-requests?filter_by_sap_upload=false

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/pending-overtime-request-sap-upload` + params, httpOptions)
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


  
  postAllowanceRecordNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/overtime-request/extend-expiry`, body, httpOptions)
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
