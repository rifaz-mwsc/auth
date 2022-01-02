import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

import { environment } from './../../../../../../../environments/environment';
import { HrAllowanceCustomTimingService } from './../../../services/manage-attendance/hr-allowance-custom-timing.service';


@Component({
  selector: 'app-hr-attendance-custom-timing-create',
  templateUrl: './hr-attendance-custom-timing-create.component.html',
  styleUrls: ['./hr-attendance-custom-timing-create.component.scss']
})
export class HrAttendanceCustomTimingCreateComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Create New
  newCustomTiming: any = {
    'validFrom': null, 'validTo': null,
    'punchInHours': null, 'punchInMinutes': null,
    'punchInPossibleFromMinutes': null, 'punchInPossibleToMinutes': null, 'punchInOnTimeMinutes': null,
    'punchOutHours': null, 'punchOutMinutes': null,
    'punchOutPossibleFromMinutes': null, 'punchOutPossibleToMinutes': null,
    'employeeId': null
  };
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Parent Component Data
  @Input() showLoader: boolean = false;

  // Close Model
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private _allowanceCustomTimingBase: HrAllowanceCustomTimingService,
  ) {
  }

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
    console.log('create -> newCustomTiming             -> ', this.newCustomTiming);
    this._allowanceCustomTimingBase.postAttendanceCustomTimingNew(
      {
        valid_from: this.newCustomTiming.validFrom,
        valid_to: this.newCustomTiming.validTo,
        punch_in_hour: this.newCustomTiming.punchInHours,
        punch_in_minute: this.newCustomTiming.punchInMinutes,
        punch_in_possible_from_by_minutes: this.newCustomTiming.punchInPossibleFromMinutes,
        punch_in_possible_to_by_minutes: this.newCustomTiming.punchInPossibleToMinutes,
        punch_in_on_time_by_minutes: this.newCustomTiming.punchInOnTimeMinutes,
        punch_out_hour: this.newCustomTiming.punchOutHours,
        punch_out_minute: this.newCustomTiming.punchOutMinutes,
        punch_out_possible_from_by_minutes: this.newCustomTiming.punchOutPossibleFromMinutes,
        punch_out_possible_to_by_minutes: this.newCustomTiming.punchOutPossibleToMinutes,
        custom_punch_in_out_employee_id: this.newCustomTiming.employeeId
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this.toastr.info('Created', 'New Custom Time Created', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
      this.disableSaveButton = false;
      this.showModelLoader = false;
      setTimeout(() => {
        this.closeModel();
      }, this.modelCloseTimeOut);
    }, (error: Response | any) => {
      console.log('getMyLeaveRequestForPageOneOnly -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
      } else if (error.status === 0 || error.status === 400 || error.status === 400) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.disableSaveButton = true;
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
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

  resetFormTextFields(functionName) {
    this.newCustomTiming = {
      'validFrom': null, 'validTo': null,
      'punchInHours': null, 'punchInMinutes': null,
      'punchInPossibleFromMinutes': null, 'punchInPossibleToMinutes': null, 'punchInOnTimeMinutes': null,
      'punchOutHours': null, 'punchOutMinutes': null,
      'punchOutPossibleFromMinutes': null, 'punchOutPossibleToMinutes': null,
      'employeeId': null
    };
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
