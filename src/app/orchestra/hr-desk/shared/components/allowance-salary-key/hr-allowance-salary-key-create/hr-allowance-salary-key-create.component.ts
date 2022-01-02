import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HrAllowanceSalaryKeyBaseService } from './../../../services/manage-allowance/hr-allowance-salary-key-base.service';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-salary-key-create',
  templateUrl: './hr-allowance-salary-key-create.component.html',
  styleUrls: ['./hr-allowance-salary-key-create.component.scss']
})
export class HrAllowanceSalaryKeyCreateComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Create New
  salaryKeyName: any;
  salaryKeyDesciption: any;
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
    private _allowanceSalaryKeyBase: HrAllowanceSalaryKeyBaseService) { }

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
    console.log('create -> salaryKeyName             -> ', this.salaryKeyName);
    console.log('create -> salaryKeyDesciption -> ', this.salaryKeyDesciption);
    this._allowanceSalaryKeyBase.postSalaryKeyNew(
      {
        salary_key_name: this.salaryKeyName,
        salary_key_description: this.salaryKeyDesciption,
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this.toastr.info('Created', 'New Allowance Type Created', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
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
    this.salaryKeyName = '';
    this.salaryKeyDesciption = '';
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
