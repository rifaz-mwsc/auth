import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-hr-allowance-type-assign-create',
  templateUrl: './hr-allowance-type-assign-create.component.html',
  styleUrls: ['./hr-allowance-type-assign-create.component.scss']
})
export class HrAllowanceTypeAssignCreateComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  // Create New
  allowanceName: any;
  allowanceIsAttendanceBase: any;
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Parent Component Data
  @Input() showLoader: boolean = false;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, this.modelCloseTimeOut);
  }

  create() {
    this.disableSaveButton = true;
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    console.log('create -> allowanceName             -> ', this.allowanceName);
    console.log('create -> allowanceIsAttendanceBase -> ', this.allowanceIsAttendanceBase);
    // this.staffPortalLeaveBase.postStaffPortalLeaveRequest(
    //   {
    //     // leave_request_employee_id: '1222',
    //     leave_request_absence_type_sap_id: this.absenceTypeSapId,
    //     leave_request_taken_from: this.takenFrom,
    //     leave_request_taken_to: this.takenTo,
    //     leave_request_additional_details: this.additionalDetails,
    //     // leave_request_nature_of_sickness: this.natureOfSickness,
    //     // leave_request_is_self_certification: this.isSelfCertification
    //   }
    // ).subscribe((data: any) => {
    //   console.log('requestList data', data);
    //   this.newRequest = data;
    //   this.toastr.info('Created', 'New Leave', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
    //   this.disableSaveButton = false;
    //   this.showModelLoader = false;
    //   this.requestCreated = true;
    // }, (error: Response | any) => {
    //   console.log('getMyLeaveRequestForPageOneOnly -> error', error);
    //   if (error.status === 400) {
    //     this.generalApiError = error.error.error_message;
    //     this.modelStateError = error.error.errors;
    //   } else if (error.status === 0 || error.status === 400 || error.status === 400) {
    //     this.generalApiError = 'oh snap! unknown error occurred';
    //   } else {
    //     this.generalApiError = error.error.error_message;
    //   }
    //   this.disableSaveButton = true;
    //   this.showModelLoader = false;
    //   return throwError(new Error(error.status));
    // });
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    this.resetApiErrorModal('onChangeEvent');
    this.disableSaveButton = false;
  }


  closeModel() {
    this.resetApiErrorModal('');
    this.resetFormTextFields('');
    this.closeThisModel.emit(null);
  }

  resetFormTextFields(functionName){
    // this.allowanceTypeName = '';
    // this.allowanceTypeIsAttendanceBased = false;
  }

  resetApiErrorModal(functionName) {
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName,' -> modelStateError - ', this.modelStateError);
    console.log(functionName,' -> generalApiError - ', this.generalApiError);
  }
}
