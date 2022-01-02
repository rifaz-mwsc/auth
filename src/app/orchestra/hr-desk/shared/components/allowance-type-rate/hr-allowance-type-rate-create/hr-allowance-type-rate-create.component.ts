import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HrAllowanceTypeRateService } from './../../../services/manage-allowance/hr-allowance-type-rate.service';
import { HrAllowanceTypeService } from './../../../services/manage-allowance/hr-allowance-type.service';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-hr-allowance-type-rate-create',
  templateUrl: './hr-allowance-type-rate-create.component.html',
  styleUrls: ['./hr-allowance-type-rate-create.component.scss']
})
export class HrAllowanceTypeRateCreateComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Create New
  allowanceTypeId: any;
  allowanceRateAmount: any;
  allowanceValidFrom: any;
  allowanceValidTo: any;
  // Drop Down
  allowanceTypeList: any = [];
  disableAllowanceTypeList: boolean = true;
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
    private _allowanceTypeRateBase: HrAllowanceTypeRateService,
    private _allowanceTypeBase: HrAllowanceTypeService) {
    this.getAllowanceTypeList();
  }

  ngOnInit() {
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, this.modelCloseTimeOut);
  }

  //   "allowance_rate_allowance_type_Id": "a714ad60-5323-43a1-b377-08d91e680405",
  //   "allowance_rate_valid_from": "2021-05-24T05:00:30.572Z",
  //   "allowance_rate_valid_to": "2022-05-24T05:00:30.572Z",
  //   "allowance_rate_amount": 100



  create() {
    this.disableSaveButton = true;
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    console.log('create -> allowanceTypeId     -> ', this.allowanceTypeId);
    console.log('create -> allowanceValidFrom  -> ', this.allowanceValidFrom);
    console.log('create -> allowanceValidTo    -> ', this.allowanceValidTo);
    console.log('create -> allowanceRateAmount -> ', this.allowanceRateAmount);
    this._allowanceTypeRateBase.postAllowanceTypeRateNew(
      {
        allowance_rate_allowance_type_Id: this.allowanceTypeId,
        allowance_rate_valid_from: this.allowanceValidFrom,
        allowance_rate_valid_to: this.allowanceValidTo,
        allowance_rate_amount: this.allowanceRateAmount,
      }
    ).subscribe((data: any) => {
      console.log('requestList data', data);
      this.toastr.info('Created', 'New Leave', { closeButton: true, timeOut: 3000, progressBar: true, enableHtml: true });
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


  getAllowanceTypeList() {
    this.disableAllowanceTypeList = true;
    this.allowanceTypeList = [];
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    this._allowanceTypeBase.getAllowanceTypeList().subscribe((data: any) => {
      console.log('getAllowanceTypeList data', data);
      this.allowanceTypeList = data;
      this.disableAllowanceTypeList = false;
      this.showModelLoader = false;
    }, (error: Response | any) => {
      console.log('getAllowanceTypeList -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
      } else if (error.status === 0 || error.status === 400 || error.status === 400) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.disableAllowanceTypeList = true;
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  allowanceTypeDropDownOnChange($event) {
    // console.log('event', $event);
    // console.log('currentDepartmentList', this.department);
    // this.department = $event;
    // this.getSectionsByDepartmentId();

    console.log('allowanceTypeDropDownOnChange ->              $event ->', $event);
    // this.departmentList.forEach(ele => {
    //   if (ele.organization_department_id === $event) {
    //     this.departmentId = ele.organization_department_id;
    //     this.departmentName = ele.organization_department_label;
    //     console.log('departmentOnChange ->     this.department ', this.department);
    //     console.log('departmentOnChange ->   this.departmentId ', this.departmentId);
    //     console.log('departmentOnChange -> this.departmentName ', this.departmentName);
    //     this.getSectionsByDepartmentId();
    //   }
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
    this.allowanceTypeId = '';
    this.allowanceValidFrom = '';
    this.allowanceValidTo = '';
    this.allowanceRateAmount = '';
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
