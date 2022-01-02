import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
// import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
import { HrAllowanceTypeDeleteComponent } from './../hr-allowance-type-delete/hr-allowance-type-delete.component';
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-allowance-type-view',
  templateUrl: './hr-allowance-type-view.component.html',
  styleUrls: ['./hr-allowance-type-view.component.scss']
})
export class HrAllowanceTypeViewComponent implements OnInit, OnDestroy {

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
  @ViewChild('ViewAllowanceTypeModalBackdrop', { static: false }) ViewAllowanceTypeModalBackdrop: ElementRef;
  @ViewChild('ViewAllowanceTypeUpdateModal', { static: false }) ViewAllowanceTypeUpdateModal: ElementRef;
  @ViewChild('ViewAllowanceTypeDeleteModal', { static: false }) ViewAllowanceTypeDeleteModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrAllowanceTypeDeleteComponent, { static: false }) HrAllowanceTypeDeleteComponent: HrAllowanceTypeDeleteComponent;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    $("body>#ViewAllowanceTypeDeleteModal").remove();
  }

  ngAfterViewInit() {
    this.HrAllowanceTypeDeleteComponent.resetApiErrorModal('fromParent');
  }


  hideViewAllowanceTypeDeleteModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = '';
    this.ViewAllowanceTypeDeleteModal.nativeElement.className = '';
    this.ViewAllowanceTypeDeleteModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal('hide');
  }

  showViewAllowanceTypeDeleteModal(selecteditem) {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewAllowanceTypeDeleteModal.nativeElement.className = 'modal fade show';
    this.ViewAllowanceTypeDeleteModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal("show");
    console.log('showViewAllowanceTypeDeleteModal');
  }


  hideViewAllowanceTypeUpdateModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = '';
    this.ViewAllowanceTypeUpdateModal.nativeElement.className = '';
    this.ViewAllowanceTypeUpdateModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal('hide');
  }

  showViewAllowanceTypeUpdateModal(selecteditem) {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewAllowanceTypeUpdateModal.nativeElement.className = 'modal fade show';
    this.ViewAllowanceTypeUpdateModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal("show");
    console.log('showViewAllowanceTypeUpdateModal');
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
