import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../services/hr-ot-requests-base.service'
import { environment } from './../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-hr-upload-ot-reject',
  templateUrl: './hr-upload-ot-reject.component.html',
  styleUrls: ['./hr-upload-ot-reject.component.scss']
})
export class HrUploadOtRejectComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  rejectionReason: any;
  // Create New - Loader
  // showModelLoader: boolean = false;
  @Input() showModelLoader: boolean = false;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selectedOvertimeData: any;
  @Input() requestDetails: any;
  @Input() selecteditem: any;

  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private hrOtRequestsBase: HrOtRequestsBaseService) { }

  ngOnInit() {
  }

  reject(selectedleaveData) {
    console.log('reject -> selectedleaveData', selectedleaveData);
    this.resetApiErrorModal('');
    this.showModelLoader = true;
    this.hrOtRequestsBase.postHRDeskOvertimeRequestReject(
      {
        overtime_request_id: selectedleaveData.overtime_request_id,
        overtime_rejection_reason: this.rejectionReason
      }
    ).subscribe((data: any) => {
      console.log('reject data', data);
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this.toastr.warning('Overtime Request', 'Overtime rejected', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }


  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('');
  }

  closeModel() {
    this.resetApiErrorModal('');
    // this.requestDetails = [];
    this.closeThisModel.emit(null);
  }

  resetApiErrorModal(functionName) {
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> modelStateError - ', this.modelStateError);
    console.log(functionName, ' -> generalApiError - ', this.generalApiError);
  }
}
