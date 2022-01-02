import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
// import { HrLeaveRequestsExtendBulkModelComponent } from '../hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-salary-key-view',
  templateUrl: './hr-allowance-salary-key-view.component.html',
  styleUrls: ['./hr-allowance-salary-key-view.component.scss']
})
export class HrAllowanceSalaryKeyViewComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  selectedItemDetails: any = [];
  // Selected Requests
  selectedLeaveList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;



  // Reset Fields - Call Child Function
  @ViewChild('ViewAllowanceSalaryKeyDeleteModalBackdrop', { static: false }) ViewAllowanceSalaryKeyDeleteModalBackdrop: ElementRef;
  @ViewChild('ViewAllowanceSalaryKeyDeleteModal', { static: false }) ViewAllowanceSalaryKeyDeleteModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // @ViewChild(HrLeaveRequestsExtendBulkModelComponent, { static: false }) HrLeaveRequestsExtendBulkModelComponent: HrLeaveRequestsExtendBulkModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrLeaveRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewAllowanceSalaryKeyDeleteModal() {
    this.resetApiErrorModal('');
    // this.requestToRefresh('');
    this.ViewAllowanceSalaryKeyDeleteModalBackdrop.nativeElement.className = '';
    this.ViewAllowanceSalaryKeyDeleteModal.nativeElement.className = '';
    this.ViewAllowanceSalaryKeyDeleteModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeRateDeleteModal').modal('hide');
  }

  showViewAllowanceSalaryKeyDeleteModal(selecteditem) {
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceSalaryKeyDeleteModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewAllowanceSalaryKeyDeleteModal.nativeElement.className = 'modal fade show';
    this.ViewAllowanceSalaryKeyDeleteModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeRateDeleteModal').modal('show');
    console.log('showViewAllowanceTypeRateDeleteModal');
  }


  resetApiErrorModal(functionName) {
    this.ngAfterViewInit();
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> modelStateError - ', this.modelStateError);
    console.log(functionName, ' -> generalApiError - ', this.generalApiError);
  }

  // Request Refresh API Data
  requestToRefresh(functionName) {
    console.log(functionName, ' -> requestToRefresh - ', this.requestToRefreshApiData);
    this.requestToRefreshApiData.emit(null);
    console.log(functionName, ' -> requestToRefresh - ', this.requestToRefreshApiData);
  }
}
