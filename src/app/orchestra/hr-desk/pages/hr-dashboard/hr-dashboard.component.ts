import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HrDashboardBaseService } from './../../shared/services/hr-dashboard-base.service';
import { environment } from './../../../../../environments//environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
})
export class HrDashboardComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  approvalCountList: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  constructor(private hrDashboardBase : HrDashboardBaseService) {
    this.getApprovalCount();
   }

  ngOnInit() {
  }


  getApprovalCount() {
    this.showLoader = true;
    this.approvalCountList = [];
    this.hrDashboardBase.getApprovalCount().subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.approvalCountList = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


}
