import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../services/hr-ot-requests-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;
import { HrOtRequestsExtendBulkModelComponent } from '../hr-ot-requests-extend-bulk-model/hr-ot-requests-extend-bulk-model.component';

@Component({
  selector: 'app-hr-ot-requests-view-table',
  templateUrl: './hr-ot-requests-view-table.component.html',
  styleUrls: ['./hr-ot-requests-view-table.component.scss']
})
export class HrOtRequestsViewTableComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selectedData: any = [];
  requestDetails: any = [];
  // Selected Requests
  selectedOtList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;



  // Reset Fields - Call Child Function
  @ViewChild('TableViewRecordDetailsModal', { static: false }) TableViewRecordDetailsModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrOtRequestsExtendBulkModelComponent, { static: false }) HrOtRequestsExtendBulkModelComponent: HrOtRequestsExtendBulkModelComponent;

  constructor(private hrOtRequestsBase: HrOtRequestsBaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrOtRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }



  getHRDeskOvertimeRequestDetails(leaveId) {
    this.showLoader = true;
    this.requestDetails = [];
    this.hrOtRequestsBase.getHRDeskOtRequestDetailsByOtId(leaveId).subscribe((data: any) => {
      console.log('getHRDeskOtRequestDetailsByOtId data', data);
      this.requestDetails = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  hideViewRecordDetailsModal() {
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.requestDetails = [];
    console.log('showViewRecordDetailsModal');
    this.requestDetails = selecteditem;
    $('#TableViewRecordDetailsModal').modal('show');
  }

  hideViewExtendBulkModal() {
    $('#TableViewExtendBulkModal').modal('hide');
  }

  showViewExtendBulkModal() {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#TableViewExtendBulkModal').modal('show');
  }

  hideViewRejectModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#TableViewRejectModal').modal('hide');
  }

  showViewRejectModal(selecteditem) {
    // this.getHRDeskOvertimeRequestDetails(selecteditem.overtime_request_id);
    this.requestDetails = [];
    console.log('showViewRejectModal');
    this.requestDetails = selecteditem;
    $('#TableViewRejectModal').modal('show');
  }

  changeCheckBox(event, otRequest) {
    console.log("changeCheckBox -> ", otRequest, +' CheckBox ', event.target.checked);
    if (event.target.checked === true) {
      this.selectedOtList.push(otRequest);

      this.selectedOtList.forEach(ele => {
        if (ele.overtime_request_id === otRequest.overtime_request_id) {
          ele.overtime_request_can_upload_to_sap_ui = true;
          ele.overtime_request_checkbox_ui = true;
        }
      });
      this.requestList.forEach(ele => {
        if (ele.overtime_request_id === otRequest.overtime_request_id) {
          ele.overtime_request_can_upload_to_sap_ui = true;
          ele.overtime_request_checkbox_ui = true;
        }
      });
    } else {
      let index = this.selectedOtList.indexOf(otRequest);
      this.requestList.forEach(ele => {
        if (ele.overtime_request_id === otRequest.overtime_request_id) {
          ele.overtime_request_can_upload_to_sap_ui = false;
          ele.overtime_request_checkbox_ui = false;
        }
      });
      this.selectedOtList.splice(index, 1);
    }
    console.log("changeCheckBox -> this.selectedLeaveList ", this.selectedOtList);
  }

  changeCheckAll(event) {
    console.log('changeCheckAll -> ', event.target.checked);
    if (event.target.checked === true) {
      this.requestList.forEach(ele => {
        ele.overtime_request_can_upload_to_sap_ui = true;
        ele.overtime_request_checkbox_ui = true;
        this.selectedOtList.push(ele);
      });
    } else {
      this.requestList.forEach(ele => {
        ele.overtime_request_can_upload_to_sap_ui = false;
        ele.overtime_request_checkbox_ui = false;
      });
      this.selectedOtList = [];
    }
    console.log("changeCheckBox -> this.selectedLeaveList ", this.selectedOtList);
  }


  getStatusDescriptionColorCode(leaveRequest) {
    if (leaveRequest.overtime_request_status_description === 'Request is approved' ||
      leaveRequest.overtime_request_status_description === 'Request is approved' ||
      leaveRequest.overtime_request_status_description.includes('Request is approved')) {
      return 'badge badge-success';
    }
    if (leaveRequest.overtime_request_status_description === 'Pending HR approval' ||
      leaveRequest.overtime_request_status_description === 'Request is sent for HR approval' ||
      leaveRequest.overtime_request_status_description === 'pending HR approval') {
      return 'badge badge-info';
    }
    if (leaveRequest.overtime_request_status_description === 'Request is sent for approval' ||
      leaveRequest.overtime_request_status_description === 'request is sent for approval') {
      return 'badge badge-warning';
    }
    if (leaveRequest.overtime_request_status_description === 'Request is sent for supervisor approval' ||
      leaveRequest.overtime_request_status_description === 'request is sent for supervisor approval' ||
      leaveRequest.overtime_request_status_description.includes('Request is sent for approval to') ||
      leaveRequest.overtime_request_status_description.includes('Request is sent for approval') ||
      leaveRequest.overtime_request_status_description.includes('Request is sent for supervisor approval') ||
      leaveRequest.overtime_request_status_description.includes('Request is sent for supervisor')) {
      return 'badge badge-warning';
    }
    if (leaveRequest.overtime_request_status_description === 'Request has expired before supervisor approval') {
      return 'badge badge-danger';
    }
    if (leaveRequest.overtime_request_status_description === 'Request has expired' ||
      leaveRequest.overtime_request_status_description === 'request has expired') {
      return 'badge badge-danger';
    }
    if (leaveRequest.overtime_request_status_description === 'Not sent for approval' ||
      leaveRequest.overtime_request_status_description === 'not sent for approval') {
      return 'badge badge-warning';
    }
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
