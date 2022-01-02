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
export class HrEmployeeProfileBaseService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    return { headers };
  }

  private prepareOptionsFileUpload(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }


  postHRDeskProfileBasicInfo(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/profile/update-employee-basic-info`, body, httpOptions)
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



  // /v1/profile/assign-employee-supervisor
  postHRDeskProfileUpdateSupervisor(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/profile/update-employee-supervisor`, body, httpOptions)
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

  // /v1/profile/assign-employee-supervisor
  postHRDeskProfileUpdateAccessCard(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);
    return this.http.put<any>(`${environment.hrDeskApiConfig.api_url}v1/profile/update-employee-door-access-card`, body, httpOptions)
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


  // /v1/profile/assign-employee-supervisor
  postHRDeskProfileUpdatePicture(formData) {
    const httpOptions = this.prepareOptionsFileUpload();
    // const params = '?employee_id=' + employeeId + '&letter_title=' + letterTitle;

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/profile/picture`, formData, httpOptions)
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


  // /v1/profile/picture
  getHRDeskProfilePicture(employeeDomainId) {
    const httpOptions = this.prepareOptions();
    const params = '?domain_id=' + employeeDomainId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/profile/picture` + params, httpOptions)
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


  // https://hr-desk-api-dev-01.mwsc.com.mv/v1/employee/qr-code?qr_code_value=42e907f8447db272308713816d2d31c2d74d16ebQg%252BW%252BriAbp5y5mugEnigg93%252FIQM%253D1222
  // GET   /v1​/employee​/qr-code
  getHRDeskProfileQR(qrCodeValue) {
    const httpOptions = this.prepareOptions();
    const params = '?qr_code_value=' + qrCodeValue;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1​/employee​/qr-code` + params, httpOptions)
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
