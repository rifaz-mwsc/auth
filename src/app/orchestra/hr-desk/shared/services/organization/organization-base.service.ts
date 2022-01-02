import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscriber } from 'rxjs';
import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { CoreApiAuthService } from './../../../../../core/services/auth/core-api-auth.service';
// import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
// import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
// import { environment } from './../../../../../environments/environment';
import { environment } from './../../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationBaseService {

  constructor(private http: HttpClient, private coreApiAuthService: CoreApiAuthService) { }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem('yodaCoreApiToken'));
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token.access_token}`);
    // console.log('headers', headers);
    return { headers };
  }



  private headerWithRefreshToken(): any {
    let tempToken  = this.coreApiAuthService.getYodaCoreApiToken();
    console.log('headerWithRefreshToken -> tempToken : ', tempToken);
    
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

  // v1/organization/divisions
  getHRDeskOrganizationDivisions() {
    const httpOptions = this.prepareOptions();
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/divisions`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('getHRDeskOrganizationDivisions', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }















  postHRDeskAddDivision(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/division`, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskOrganizationDivisionList() {
    const httpOptions = this.headerWithRefreshToken();

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/division-list`, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskOrganizationDivisionsWithFilters(pageNo, pageSize, searchText) {
    const httpOptions = this.prepareOptions();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&search=' + searchText.toString();;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/divisions` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskOrganizationListDepartmentsByDivisionId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_division_id=' + requestId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/departments-by-division-id` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskDivisionByDivisionId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_division_id=' + requestId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/division` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  postHRDeskRemoveDivision(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_division_id=' + requestId;

    return this.http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/division` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }












  postHRDeskAddDepartment(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/department`, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskOrganizationDepartmentsWithFilters(pageNo, pageSize, searchText) {
    console.log('hr-organisation-base', 'Test');
    const httpOptions = this.prepareOptions();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&search=' + searchText.toString();;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/departments` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskOrganizationListSectionsByDepartmentId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_deparment_id=' + requestId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/sections-by-department-id` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  getHRDeskDepartmentByDepartmentId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_deparment_id=' + requestId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/department` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }



  postHRDeskRemoveDepartment(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_department_id=' + requestId;

    return this.http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/department` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }












  postHRDeskAddSection(data) {
    const httpOptions = this.prepareOptions();
    const body = JSON.stringify(data);

    return this.http.post<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/section`, body, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        // console.log('accountData', accountData);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskOrganizationSectionsWithFilters(pageNo, pageSize, searchText) {
    console.log('hr-organisation-base', 'Test');
    const httpOptions = this.prepareOptions();
    const params =
      '?page=' + pageNo +
      '&page_size=' + pageSize +
      '&search=' + searchText.toString();;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/sections` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }


  getHRDeskSectionBySectionId(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_section_id=' + requestId;

    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/section` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }

  
  postHRDeskRemoveSection(requestId) {
    const httpOptions = this.prepareOptions();
    const params = '?organization_section_id=' + requestId;

    return this.http.delete<any>(`${environment.hrDeskApiConfig.api_url}v1/organization/section` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }












  getHRDeskDocumentById(documentId) {
    console.log('hr-organisation-base', 'Test');
    const httpOptions = this.prepareOptions();
    const params = '?document_id=' + documentId;
    return this.http.get<any>(`${environment.hrDeskApiConfig.api_url}v1/uploaded-documents` + params, httpOptions)
      .pipe(map(res => {
        // this.accountList = res;
        // localStorage.setItem('hrDeskHolidays', JSON.stringify(res));
        // this.userAccountsSubject.next(accountData);
        console.log('hr-organisation-base', res);
        return res;
      },
        catchError((error: any) => {
          console.log('hr-organisation-base -> error', error);
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
          console.log('hr-organisation-base -> error', error);
          // this.formatErrors(error);
          return throwError(error || 'Server error');
        })
      ));
  }
}
