import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DutyrosterShiftTimeTemplateBaseService {

  adal8ServiceObj: any;

  constructor(private _adal_http: Adal8HTTPService, private _authService: AuthService, private http: HttpClient) { }

  private prepareOptions(): any {
    this.adal8ServiceObj = this._authService.getAdal8Service();
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
    return { headers };
  }


  getDutyRosterGetShiftTemplatesAll() {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftTemplates/All`, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('hr-dutyroster-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-dutyroster-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postDutyRosterGetShiftTemplatesNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftTemplates/Times/New`, body, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('hr-dutyroster-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-dutyroster-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getDutyRosterGetShiftTemplateById(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftTemplates/` + shiftGroupId, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('hr-dutyroster-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-dutyroster-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postDutyRosterGetShiftTemplateRemove() {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftTemplates/Times/Remove`, httpOptions)
      .pipe(map(res => {
        // localStorage.setItem('postStaffPortalLeaveRequest', JSON.stringify(res));
        // this.leaveRequestsSubject.next(res);
        console.log('hr-dutyroster-service -> res', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-dutyroster-service -> error', error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
