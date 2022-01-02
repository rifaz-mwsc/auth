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
export class DutyrosterManageShiftgroupBaseService {

  adal8ServiceObj: any;

  constructor(private _adal_http: Adal8HTTPService, private _authService: AuthService, private http: HttpClient) { }

  private prepareOptions(): any {
    this.adal8ServiceObj = this._authService.getAdal8Service();
    let headers = new HttpHeaders();
    // console.log('ADAL Shit-Hole', this.adal8ServiceObj.userInfo.token);
    // let token = JSON.parse(localStorage.getItem('adalToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
    // console.log('headers', headers);
    return { headers };
  }


  postDutyRosterGetShiftGroupAll(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/All`, body, httpOptions)
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


  postDutyRosterGetShiftGroupNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/New`, body, httpOptions)
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


  getDutyRosterShiftGroupRemove(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Delete', httpOptions)
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

  getDutyRosterShiftGroupRestore(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Restore', httpOptions)
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

  getDutyRosterGetShiftGroupById(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId, httpOptions)
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

  deleteDutyRosterGetShiftGroupById(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Delete', httpOptions)
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


  retoreDutyRosterGetShiftGroupById(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Restore', httpOptions)
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









  getDutyRosterGetShiftGroupEmployeesByShiftGroupId(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Employees', httpOptions)
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

  getDutyRosterGetShiftGroupSupervisorsByShiftGroupId(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/Supervisors', httpOptions)
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

  getDutyRosterGetShiftGroupYearsByShiftGroupId(shiftGroupId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/WeeklyShift/Years', httpOptions)
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


  getDutyRosterShiftGroupWeeklyshiftByShiftGroupId(shiftGroupId, year) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftGroups/` + shiftGroupId + '/WeeklyShift/ForYear/' + year, httpOptions)
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






  // Employee
  postDutyRosterShiftGroupEmployeeNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftEmployees/New`, body, httpOptions)
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

  getDutyRosterShiftGroupEmployeeRemove(shiftEmployeeId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftEmployees/` + shiftEmployeeId + '/Remove', httpOptions)
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

  getDutyRosterShiftGroupEmployeeRestore(shiftEmployeeId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftEmployees/` + shiftEmployeeId + '/Restore', httpOptions)
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





  // Supervisor
  postDutyRosterShiftGroupSupervisorNew(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftsSupervisor/New`, body, httpOptions)
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

  getDutyRosterShiftGroupSupervisorRemove(shiftSupervisorId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftsSupervisor/` + shiftSupervisorId + '/Remove', httpOptions)
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

  getDutyRosterShiftGroupSupervisorRestore(shiftSupervisorId) {
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    return this.http.get<any>(`${environment.yodaApiConfig.api_url}DutyRoster/ShiftsSupervisor/` + shiftSupervisorId + '/Restore', httpOptions)
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











  // WeeklyShift
}
