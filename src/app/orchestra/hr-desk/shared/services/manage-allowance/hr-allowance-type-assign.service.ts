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
export class HrAllowanceTypeAssignService {

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

  getAllowanceTypeAssignList() {
    const httpOptions = this.prepareOptions();

    if (this.devJsonAPI == true) {
      return this._http.get<any>(`${environment.devJsonApiConfig.api_json_server_url}v1/allowance-type`, httpOptions)
        .pipe(map(res => {
          // this.accountList = res;
          // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
          // this.userAccountsSubject.next(accountData);
          console.log('getAllowanceTypeAssignList', res);
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



  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/allowance-management/allowance-assigned/paged-list?page=1&page_size=10
  getAllowanceTypeAssignListWithFilters(pageNo, pageSize, searchText) {
    const httpOptions = this.prepareOptions();
    const params = '?page=' + pageNo + '&page_size=' + pageSize + '&filter_by_employee_id=' + searchText;
    // const params = '?page=' + pageNo + '&page_size=' + pageSize;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/allowance-assigned/paged-list` + params, httpOptions)
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

  getAllowanceTypeAssignById() {
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



  // {
  //   "allowance_assigned_allowance_type_Id": "a714ad60-5323-43a1-b377-08d91e680405",
  //   "allowance_assigned_employee_id": "1222",
  //   "allowance_assigned_valid_from": "2020-05-20T05:23:06.766Z",
  //   "allowance_assigned_valid_to": "2030-05-24T05:23:06.766Z"
  // }
  postAllowanceTypeAssignNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/allowance-assigned`, body, httpOptions)
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


  deleteAllowanceTypeAssign(allowanceTypeId, allowanceEmployeeId) {
    const httpOptions = this.prepareOptions();
    const params = '?allowance_assigned_id=' + allowanceTypeId + '&allowance_assigned_employee_id=' + allowanceEmployeeId;

    return this._http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/allowance-assigned` + params, httpOptions)
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
