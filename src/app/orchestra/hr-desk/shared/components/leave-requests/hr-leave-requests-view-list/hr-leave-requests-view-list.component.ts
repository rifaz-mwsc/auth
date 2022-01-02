import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
import { HrLeaveRequestsExtendBulkModelComponent } from '../hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { Observable, Subject, throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-leave-requests-view-list',
  templateUrl: './hr-leave-requests-view-list.component.html',
  styleUrls: ['./hr-leave-requests-view-list.component.scss']
})
export class HrLeaveRequestsViewListComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // Selected Requests
  selectedLeaveList: any = [];
  selectAll: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;



  // Reset Fields - Call Child Function
  @ViewChild('ListViewRecordDetailsModal', { static: false }) ListViewRecordDetailsModal: ElementRef;
  @ViewChild('ListViewExtendBulkModal', { static: false }) ListViewExtendBulkModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrLeaveRequestsExtendBulkModelComponent, { static: false }) HrLeaveRequestsExtendBulkModelComponent: HrLeaveRequestsExtendBulkModelComponent;


  constructor(private hrLeaveRequestsBase: LeaveRequestsBaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrLeaveRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }

  getHRDeskLeaveRequestDetails(leaveId) {
    this.showLoader = true;
    this.requestDetails = [];
    this.hrLeaveRequestsBase.getHRDeskLeaveRequestDetailsByLeaveId(leaveId).subscribe((data: any) => {
      console.log('getHRDeskLeaveRequestDetails data', data);
      this.requestDetails = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  hideViewRecordDetailsModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#ListViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#ListViewRecordDetailsModal').modal('show');
  }

  hideViewShortenModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#TableViewShortenModal').modal('hide');
  }

  showViewShortenModal(selecteditem) {
    this.requestDetails = selecteditem;
    this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#TableViewShortenModal').modal('show');
  }


  hideViewExtendBulkModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#ListViewExtendBulkModal').modal('hide');
    this.selectedLeaveList = [];
    console.log('hideViewExtendBulkModal()');
  }

  showViewExtendBulkModal() {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#ListViewExtendBulkModal').modal('show');
  }


  changeCheckBox(event, leave) {
    console.log("changeCheckBox -> ", leave, +' CheckBox ', event.target.checked);
    if (event.target.checked === true) {
      this.selectedLeaveList.push(leave);

      this.selectedLeaveList.forEach(ele => {
        if (ele.leave_request_id === leave.leave_request_id) {
          ele.leave_request_can_upload_to_sap_ui = true;
          ele.leave_request_checkbox_ui = true;
        }
      });
      this.requestList.forEach(ele => {
        if (ele.leave_request_id === leave.leave_request_id) {
          ele.leave_request_can_upload_to_sap_ui = true;
          ele.leave_request_checkbox_ui = true;
        }
      });
    } else {
      let index = this.selectedLeaveList.indexOf(leave);
      this.requestList.forEach(ele => {
        if (ele.leave_request_id === leave.leave_request_id) {
          ele.leave_request_can_upload_to_sap_ui = false;
          ele.leave_request_checkbox_ui = false;
        }
      });
      this.selectedLeaveList.splice(index, 1);
    }
    console.log("changeCheckBox -> this.selectedLeaveList ", this.selectedLeaveList);
  }

  changeCheckAll(event) {
    console.log('changeCheckAll -> ', event.target.checked);
    if (event.target.checked === true) {
      this.requestList.forEach(ele => {
        ele.leave_request_can_upload_to_sap_ui = true;
        ele.leave_request_checkbox_ui = true;
        this.selectedLeaveList.push(ele);

        this.selectAll = true;
      });
    } else {
      this.requestList.forEach(ele => {
        ele.leave_request_can_upload_to_sap_ui = false;
        ele.leave_request_checkbox_ui = false;
      });
      this.selectedLeaveList = [];
      this.selectAll = true;
    }
    console.log("changeCheckBox -> this.selectedLeaveList ", this.selectedLeaveList);
  }


  getStatusDescriptionColorCode(leaveRequest) {
    if (leaveRequest.leave_request_status_description === 'Request is approved' ||
      leaveRequest.leave_request_status_description === 'Request is approved' ||
      leaveRequest.leave_request_status_description.includes('Request is approved')) {
      return 'badge badge-success';
    }
    if (leaveRequest.leave_request_status_description === 'Pending HR approval' ||
      leaveRequest.leave_request_status_description === 'Request is sent for HR approval' ||
      leaveRequest.leave_request_status_description === 'pending HR approval') {
      return 'badge badge-info';
    }
    if (leaveRequest.leave_request_status_description === 'Request is sent for approval' ||
      leaveRequest.leave_request_status_description === 'request is sent for approval') {
      return 'badge badge-warning';
    }
    if (leaveRequest.leave_request_status_description === 'Request is sent for supervisor approval' ||
      leaveRequest.leave_request_status_description === 'request is sent for supervisor approval' ||
      leaveRequest.leave_request_status_description.includes('Request is sent for approval to') ||
      leaveRequest.leave_request_status_description.includes('Request is sent for supervisor approval') ||
      leaveRequest.leave_request_status_description.includes('Request is sent for supervisor')) {
      return 'badge badge-warning';
    }
    if (leaveRequest.leave_request_status_description === 'Request has expired' ||
      leaveRequest.leave_request_status_description === 'request has expired') {
      return 'badge badge-danger';
    }
    if (leaveRequest.leave_request_status_description === 'Not sent for approval' ||
      leaveRequest.leave_request_status_description === 'not sent for approval') {
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
