import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../services/hr-ot-requests-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;
import { HrOtRequestsExtendBulkModelComponent } from '../hr-ot-requests-extend-bulk-model/hr-ot-requests-extend-bulk-model.component';



@Component({
  selector: 'app-hr-ot-requests-view-list',
  templateUrl: './hr-ot-requests-view-list.component.html',
  styleUrls: ['./hr-ot-requests-view-list.component.scss']
})
export class HrOtRequestsViewListComponent implements OnInit {

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
  @ViewChild('ListViewRecordDetailsModal', { static: false }) ListViewRecordDetailsModal: ElementRef;
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


  // getHRDeskLeaveRequestDetails(leaveId) {
  //   this.showLoader = true;
  //   this.requestDetails = [];
  //   this.hrOtRequestsBase.getHRDeskLeaveRequestDetailsByLeaveId(leaveId).subscribe((data: any) => {
  //     console.log('getHRDeskLeaveRequestDetails data', data);
  //     this.requestDetails = data;
  //     this.showLoader = false;
  //   }, (error: Response | any) => {
  //     this.showLoader = false;
  //     return throwError(new Error(error.status));
  //   });
  // }


  hideViewRecordDetailsModal() {
    this.requestToRefresh('hideViewRecordDetailsModal');
    this.resetApiErrorModal('hideViewRecordDetailsModal');
    console.log('hideViewRecordDetailsModal');
    $('#ListViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    console.log('showViewRecordDetailsModal');
    this.selectedData = selecteditem;
    $('#ListViewRecordDetailsModal').modal('show');
  }

  hideViewExtendBulkModal() {
    this.requestToRefresh('hideViewExtendBulkModal');
    this.resetApiErrorModal('hideViewExtendBulkModal');
    console.log('hideViewExtendBulkModal');
    $('#ListViewExtendBulkModal').modal('hide');
  }

  showViewExtendBulkModal() {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#ListViewExtendBulkModal').modal('show');
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
