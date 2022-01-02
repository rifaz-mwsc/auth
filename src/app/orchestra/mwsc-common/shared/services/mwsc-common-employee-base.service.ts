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
export class MwscCommonEmployeeBaseService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }



  // {
  //   "employee_id": "091",
  //   "employee_name": "Hassan Ali",
  //   "employee_domain_id": "DU002091",
  //   "employee_name_with_id": "Hassan Ali (091)",
  //   "employee_designation": "Deputy General Manager, ICT",
  //   "employee_ext_number": 5500,
  //   "employee_mobile_number": 7990128,
  //   "employee_email": "hassan@mwsc.com.mv",
  //   "employee_section": "-",
  //   "employee_department": "Information Technology",
  //   "employee_division": "ICT",
  //   "employee_office_location": "Fen Building 1st Floor",
  //   "employee_city": "Male'",
  //   "employee_manager": {
  //     "employee_id": "196",
  //     "employee_name": "Ahmed Hunaif",
  //     "employee_domain_id": "DU003196",
  //     "employee_name_with_id": "Ahmed Hunaif (196)",
  //     "employee_designation": "General Manager, ICT",
  //     "employee_ext_number": 5600,
  //     "employee_mobile_number": 7917690,
  //     "employee_email": "hunaif@mwsc.com.mv",
  //     "employee_picture_path": "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU003196"
  //   },
  //   "employee_division_manager": null,
  //   "employee_status": "Active",
  //   "employee_last_known_location": "Unknown",
  //   "employee_work_anniversary": "15 Jun 1997",
  //   "employee_picture_path": "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU002091"
  // },
  
  // GET  /v1​/employee​/search
  // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/search?search_value=ali
   // GET /v1​/employee​/overtime-request
   getMwscCommonEmployeeSearch(searchtext) {
    const httpOptions = this.prepareOptions();
    const params = '?search_value=' + searchtext;
    // https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/overtime-request?overtime_request_id=63dc3cd3-eb70-4780-a489-08d88ba10a3f

    return this.http.get<any>(`${environment.staffAppApiConfig.api_url}v1/employee/search` + params, httpOptions)
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


}
