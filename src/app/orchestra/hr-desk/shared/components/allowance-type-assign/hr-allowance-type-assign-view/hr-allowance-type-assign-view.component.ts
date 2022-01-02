import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
import { HrAllowanceTypeAssignDeleteComponent } from './../hr-allowance-type-assign-delete/hr-allowance-type-assign-delete.component';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-allowance-type-assign-view',
  templateUrl: './hr-allowance-type-assign-view.component.html',
  styleUrls: ['./hr-allowance-type-assign-view.component.scss']
})
export class HrAllowanceTypeAssignViewComponent implements OnInit {

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
  @ViewChild('ViewAllowanceTypeAssignDeleteModalBackdrop', { static: false }) ViewAllowanceTypeAssignDeleteModalBackdrop: ElementRef;
  @ViewChild('ViewAllowanceTypeAssignDeleteModal', { static: false }) ViewAllowanceTypeAssignDeleteModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrAllowanceTypeAssignDeleteComponent, { static: false }) HrAllowanceTypeAssignDeleteComponent: HrAllowanceTypeAssignDeleteComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.HrAllowanceTypeAssignDeleteComponent.resetApiErrorModal('fromParent');
  }


  hideViewAllowanceTypeAssignDeleteModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    this.ViewAllowanceTypeAssignDeleteModalBackdrop.nativeElement.className = '';
    this.ViewAllowanceTypeAssignDeleteModal.nativeElement.className = '';
    this.ViewAllowanceTypeAssignDeleteModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeAssignDeleteModal').modal('hide');
  }

  showViewAllowanceTypeAssignDeleteModal(selecteditem) {
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceTypeAssignDeleteModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewAllowanceTypeAssignDeleteModal.nativeElement.className = 'modal fade show';
    this.ViewAllowanceTypeAssignDeleteModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeAssignDeleteModal').modal('show');
    console.log('showViewAllowanceTypeAssignDeleteModal');
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
