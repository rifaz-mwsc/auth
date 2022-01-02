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
export class HrAllowanceSalaryKeyService {

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


  // POST	 /v1​/allowance-management​/salary-key
  // DELETE	​ /v1​/allowance-management​/salary-key


  // GET	/v1​/allowance-management​/salary-keys​/paged-list
  getSalaryKeyListWithFilters(pageNo, pageSize, salaryKeyName, salaryKeyDesciption) {
    const httpOptions = this.prepareOptions();
    // const params = '?page=' + pageNo +'&page_size=' + pageSize+'&filter_by_name=' + searchText;
    const params = '?page=' + pageNo + '&page_size=' + salaryKeyName + '&page_size=' + salaryKeyDesciption;

    return this._http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/salary-keys/paged-list` + params, httpOptions)
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



  getSalaryKeyById() {
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
  //   "salary_key_name": "2021-01",
  //   "salary_key_description": "2021 January Salary"
  // }
  postSalaryKeyNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this._http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/salary-key`, body, httpOptions)
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

  
  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/allowance-management/salary-key?salary_key_Id=3ce5be09-8168-43a7-dc92-08d91e86c142
  deleteAllowanceType(allowanceTypeId) {
    const httpOptions = this.prepareOptions();
    const params = '?salary_key_Id=' + allowanceTypeId;

    return this._http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/allowance-management/salary-key` + params, httpOptions)
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
