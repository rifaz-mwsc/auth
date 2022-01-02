import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HrAllowanceTypeAssignService } from './../../../services/manage-allowance/hr-allowance-type-assign.service';
import { HrAllowanceTypeService } from './../../../services/manage-allowance/hr-allowance-type.service';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-type-assign-to-employee',
  templateUrl: './hr-allowance-type-assign-to-employee.component.html',
  styleUrls: ['./hr-allowance-type-assign-to-employee.component.scss']
})
export class HrAllowanceTypeAssignToEmployeeComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  // Create New
  allowanceTypeId: any;
  allowanceEmployeeId: any;
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
    private _allowanceTypeAssignBase: HrAllowanceTypeAssignService,
    private _allowanceTypeBase: HrAllowanceTypeService) {
    this.getAllowanceTypeList();
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
    console.log('create -> allowanceTypeId     -> ', this.allowanceTypeId);
    console.log('create -> allowanceEmployeeId -> ', this.allowanceEmployeeId);
    console.log('create -> allowanceValidFrom  -> ', this.allowanceValidFrom);
    console.log('create -> allowanceValidTo    -> ', this.allowanceValidTo);
    this._allowanceTypeAssignBase.postAllowanceTypeAssignNew(
      {
        allowance_assigned_allowance_type_Id: this.allowanceTypeId,
        allowance_assigned_employee_id: this.allowanceEmployeeId,
        allowance_assigned_valid_from: this.allowanceValidFrom,
        allowance_assigned_valid_to: this.allowanceValidTo
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
    this.allowanceEmployeeId = '';
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
