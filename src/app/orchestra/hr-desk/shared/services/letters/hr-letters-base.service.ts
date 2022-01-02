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
export class HrLettersBaseService {

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

  private prepareOptionsFileUpload(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }

  getHRDeskDocuments() {
    console.log('getHRDeskDocuments', 'Test');
    const httpOptions = this.prepareOptions();
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/uploaded-documents`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskDocuments', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-letter-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskDocumentsWithFilters(pageNo, pageSize, empoyeeId, duration) {
    console.log('getHRDeskDocuments', 'Test');
    const httpOptions = this.prepareOptions();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&filter_by_employee_id=' + empoyeeId.toString(); +
        '&filter_by_dutration=' + duration.toString();;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/uploaded-documents` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskDocuments', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-letter-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskDocumentById(documentId) {
    console.log('getHRDeskDocuments', 'Test');
    const httpOptions = this.prepareOptions();
    const params = '?document_id=' + documentId;
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/uploaded-documents` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskDocuments', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-letter-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskUploadDocument(formData, employeeId , letterTitle) {
    // MWSC - Dev & Live API Server
    const httpOptions = this.prepareOptionsFileUpload();
    const params = '?employee_id=' + employeeId + '&letter_title=' + letterTitle;

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/upload-document` + params, formData, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-letter-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskRemoveLetter(data) {
    // MWSC - Dev & Live API Server
    const httpOptions = this.prepareOptions();
    // const body = JSON.stringify(data);
    const params = '?document_id=' + data;

    return this.http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/document-remove` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('holiday-service -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
