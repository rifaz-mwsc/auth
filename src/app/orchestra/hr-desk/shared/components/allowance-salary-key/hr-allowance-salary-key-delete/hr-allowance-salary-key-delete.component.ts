import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HrAllowanceSalaryKeyService } from './../../../services/manage-allowance/hr-allowance-salary-key.service';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-salary-key-delete',
  templateUrl: './hr-allowance-salary-key-delete.component.html',
  styleUrls: ['./hr-allowance-salary-key-delete.component.scss']
})
export class HrAllowanceSalaryKeyDeleteComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Create New - Loader
  disableSaveButton: boolean = false;
  showHandoverModel: boolean = false;
  showHandoverModelLoader: boolean = false;
  // This Model - Loader
  @Input() showModelLoader: boolean = false;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selectedData: any;

  // Close Model
  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private _allowanceSalaryKeyBase: HrAllowanceSalaryKeyService) { }

  ngOnInit() {
  }

  delete(allowanceTypeRate) {
    this.disableSaveButton = true;
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    console.log('create -> allowanceTypeId -> ', allowanceTypeRate.salary_key_Id);
    this._allowanceSalaryKeyBase.deleteAllowanceType(allowanceTypeRate.salary_key_Id).subscribe((data: any) => {
      console.log('requestList data', data);
      this.toastr.warning('Deleted', 'New Salary Key Deleted', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
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
    // this.allowanceTypeName = '';
    // this.allowanceTypeIsAttendanceBased = false;
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
