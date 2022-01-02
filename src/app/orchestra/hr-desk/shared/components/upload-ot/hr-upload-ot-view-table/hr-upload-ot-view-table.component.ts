import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
import { HrUploadOtUploadBulkModelComponent } from '../hr-upload-ot-upload-bulk-model/hr-upload-ot-upload-bulk-model.component';

@Component({
  selector: 'app-hr-upload-ot-view-table',
  templateUrl: './hr-upload-ot-view-table.component.html',
  styleUrls: ['./hr-upload-ot-view-table.component.scss']
})
export class HrUploadOtViewTableComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // Advance View Switch
  showMoreDetails: boolean = false;
  isChecked: boolean = false;
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
  @ViewChild(HrUploadOtUploadBulkModelComponent, { static: false }) HrUploadOtUploadBulkModelComponent: HrUploadOtUploadBulkModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrUploadOtUploadBulkModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewRecordDetailsModal() {
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
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
    $('#TableViewRejectModal').modal('hide');
  }

  showViewRejectModal() {
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
    this.selectedOtList= [];
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


  showDetails(event: any) {
    console.log(event);
    if (event === 'showMoreDetails') {
      this.showMoreDetails = true;
    } else {
      this.showMoreDetails = false;
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
