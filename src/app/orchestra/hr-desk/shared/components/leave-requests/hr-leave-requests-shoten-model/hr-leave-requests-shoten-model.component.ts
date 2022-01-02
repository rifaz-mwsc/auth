import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service'
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-hr-leave-requests-shoten-model',
  templateUrl: './hr-leave-requests-shoten-model.component.html',
  styleUrls: ['./hr-leave-requests-shoten-model.component.scss']
})
export class HrLeaveRequestsShotenModelComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  rejectionReason: any;
  // Create New - Loader
  @Input() showModelLoader: boolean = false;
  @Input() shortenRequestType: any;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() requestDetails: any;

  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private leaveRequestsBase: LeaveRequestsBaseService) { }

  ngOnInit() {
  }


  acceptShortenLeave(selectedleaveData) {
    console.log('acceptShortenLeave data', selectedleaveData);
    this.resetApiErrorModal('');
    this.showModelLoader = true;
    this.leaveRequestsBase.postHRDeskApproveShortenLeaveRequests(selectedleaveData.leave_request_id).subscribe((data: any) => {
      console.log('acceptShortenLeave data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.toastr.success('Request Accepted', 'Leave Shorten Request Accepted', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      this.closeModel();
    }, (error: Response | any) => {
      console.log('acceptShortenLeave -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  rejectShortenLeave(selectedleaveData) {
    console.log('rejectShortenLeave data', selectedleaveData);
    this.resetApiErrorModal('');
    this.showModelLoader = true;
    this.leaveRequestsBase.postHRDeskRejectShortenLeaveRequests(
      {
        leave_request_id: selectedleaveData.leave_request_id,
        leave_request_shorten_rejection_reason: this.rejectionReason,
      }
    ).subscribe((data: any) => {
      console.log('rejectShortenLeave data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.toastr.warning('Request Rejected', 'Leave Shorten Request Rejected', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      this.closeModel();
    }, (error: Response | any) => {
      console.log('rejectShortenLeave -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
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
    this.requestDetails = [];
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
