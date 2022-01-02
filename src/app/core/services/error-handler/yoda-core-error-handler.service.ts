import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YodaCoreErrorHandlerService {

  // Error Handling
  apiError: any = { 'generalApiError': null, 'modelStateError': [] };
  modelStateError: any;
  generalApiError: any;


  constructor() { }


  public handleError(error: HttpErrorResponse) {
    console.log('error', error);

    return new Promise((resolve, reject) => {
      if (error.status === 400) {
        this.apiError.generalApiError = error.error.error_message;
        this.apiError.modelStateError = error.error.errors;
      } else if (error.status === 401) {
      } else if (error.status === 403) {
        this.apiError.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 404) {
      } else if (error.status === 405) {
      } else if (error.status === 406) {
      } else if (error.status === 412) {
      } else if (error.status === 415) {
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.apiError.generalApiError = 'oh snap! unknown error occurred';
      } else {
        this.apiError.generalApiError = error.error.error_message;
      }
      console.log('error this.apiError', this.apiError);
      resolve(this.apiError);
    });
  }
}
