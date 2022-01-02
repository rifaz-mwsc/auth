import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from './../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrAttendanceAbsenceService {

  service_title: any = 'hrDesk - AttendanceAbsence -';

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

  getHRDeskPendingAbsenceSapUpload(pageNo, pageSize, serach, pendingStatus) {
    const httpOptions = this.prepareOptions();
    const params =
      '?page=' + pageNo + '&page_size=' + pageSize + '&search=' + serach + '&filter_by_pending=' + pendingStatus;


    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/sap-upload/attendance-absence-records/paged-list` + params, httpOptions)
      .pipe(map(res => {
        console.log(this.service_title + ' res -> ', res);
        // this.accountList = res;
        localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log(this.service_title + ' error ->', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
