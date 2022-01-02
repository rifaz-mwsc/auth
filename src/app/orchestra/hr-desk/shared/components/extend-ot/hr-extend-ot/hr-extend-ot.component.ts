import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../../shared/services/hr-ot-requests-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-hr-extend-ot',
  templateUrl: './hr-extend-ot.component.html',
  styleUrls: ['./hr-extend-ot.component.scss']
})
export class HrExtendOtComponent implements OnInit {

  newExpiryDate: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Parent Component Data
  @Input() requestDetails: any;
  @Input() selecteditem: any;
  @Input() showModelLoader: boolean = false;

  visible: boolean = true;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private hrOtRequestsBase: HrOtRequestsBaseService) { }

  ngOnInit() {
  }

  extend() {
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    // console.log('create -> absenceTypeSapId', this.absenceTypeSapId);
    // console.log('create -> takenFrom', this.takenFrom);
    // console.log('create -> takenTo', this.takenTo);
    // console.log('create -> additionalDetails', this.additionalDetails);
    // console.log('create -> natureOfSickness', this.natureOfSickness);
    // console.log('create -> isSelfCertification', this.isSelfCertification);
    this.hrOtRequestsBase.postHRDeskExtendOvertimeRequests(
      {
        overtime_request_id: this.selecteditem.overtime_request_id,
        overtime_request_new_expiry_date: this.newExpiryDate,
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 400 || error.status === 400) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

}
