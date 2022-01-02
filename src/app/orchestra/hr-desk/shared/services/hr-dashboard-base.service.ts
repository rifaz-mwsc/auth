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
export class HrDashboardBaseService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }




  // GET   /v1​/dashboard​/approval-count
  getApprovalCount() {
    const httpOptions = this.prepareOptions();

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/dashboard/approval-count`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('staffPortalOtRequests', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-desk-dashboard -> response', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-desk-dashboard -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

}
