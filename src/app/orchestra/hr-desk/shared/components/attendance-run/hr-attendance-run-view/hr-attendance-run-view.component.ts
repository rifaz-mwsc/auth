import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
// import { HrLeaveRequestsExtendBulkModelComponent } from '../hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-attendance-run-view',
  templateUrl: './hr-attendance-run-view.component.html',
  styleUrls: ['./hr-attendance-run-view.component.scss']
})
export class HrAttendanceRunViewComponent implements OnInit {

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
  @ViewChild('ViewReRunModal', { static: false }) ViewReRunModal: ElementRef;
  @ViewChild('ViewDetailModal', { static: false }) ViewDetailModal: ElementRef;
  
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // @ViewChild(HrLeaveRequestsExtendBulkModelComponent, { static: false }) HrLeaveRequestsExtendBulkModelComponent: HrLeaveRequestsExtendBulkModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    $("body>#ViewAllowanceTypeDeleteModal").remove();
  }

  ngAfterViewInit() {
    // this.HrLeaveRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }


  hideViewAllowanceTypeDeleteModal() {
    // this.resetApiErrorModal('');
    // this.requestToRefresh('');
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
    console.log('showViewAllowanceTypeDeleteModal');
  }




  


  hideViewReRunModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = '';
    this.ViewReRunModal.nativeElement.className = '';
    this.ViewReRunModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal('hide');
  }

  showViewReRunModal(selecteditem) {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewReRunModal.nativeElement.className = 'modal fade show';
    this.ViewReRunModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal("show");
    console.log('showViewAllowanceTypeDeleteModal');
  }

  hideViewDetailModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = '';
    this.ViewDetailModal.nativeElement.className = '';
    this.ViewDetailModal.nativeElement.style = 'display: none; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal('hide');
  }

  showViewDetailModal(selecteditem) {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    this.selectedItemDetails = selecteditem;
    this.ViewAllowanceTypeModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.ViewDetailModal.nativeElement.className = 'modal fade show';
    this.ViewDetailModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // $('#ViewAllowanceTypeDeleteModal').modal("show");
    console.log('showViewAllowanceTypeDeleteModal');
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
