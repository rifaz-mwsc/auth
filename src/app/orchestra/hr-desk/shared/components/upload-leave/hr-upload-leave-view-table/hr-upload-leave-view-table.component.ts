import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
import { HrUploadLeaveUploadBulkModelComponent } from '../hr-upload-leave-upload-bulk-model/hr-upload-leave-upload-bulk-model.component';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-upload-leave-view-table',
  templateUrl: './hr-upload-leave-view-table.component.html',
  styleUrls: ['./hr-upload-leave-view-table.component.scss']
})
export class HrUploadLeaveViewTableComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // Advance View Switch
  showMoreDetails: boolean = false;
  isChecked: boolean = false;
  // Selected Requests
  selectedLeaveList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;



  // Reset Fields - Call Child Function
  @ViewChild('TableViewUploadBulkModal', { static: false }) TableViewUploadBulkModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrUploadLeaveUploadBulkModelComponent, { static: false }) HrUploadLeaveUploadBulkModelComponent: HrUploadLeaveUploadBulkModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrUploadLeaveUploadBulkModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewUploadBulkModal() {
    $('#TableViewUploadBulkModal').modal('hide');
    this.selectedLeaveList = [];
    console.log('hideViewUploadBulkModal');
  }

  showViewUploadBulkModal() {
    // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#TableViewUploadBulkModal').modal('show');
  }


  // hideViewUploadBulkModal(){

  // }

  // showViewUploadBulkModal() {
  //   // this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
  //   $('#TableViewUploadBulkModal').modal('show');
  // }

  hideViewRejectModal() {
    $('#TableViewRejectModal').modal('hide');
  }

  showViewRejectModal() {
    $('#TableViewRejectModal').modal('show');
  }

  changeCheckBox(event, leave) {
    console.log("changeCheckBox -> ", leave, +' CheckBox ', event.target.checked);
    if (event.target.checked === true) {
      this.selectedLeaveList.push(leave);
      console.log("requestListZe",this.requestList);
      

      // const filterdArray = this.selectedLeaveList.filter(x => x.leave_request_id != '00000000-0000-0000-0000-000000000000');
      // console.log('removed ', filterdArray);
      

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
        if ( ele.leave_request_is_split_record !== false){
          ele.leave_request_can_upload_to_sap_ui = true;
          ele.leave_request_checkbox_ui = true;
          this.selectedLeaveList.push(ele);
        }
    
      });
    } else {
      this.requestList.forEach(ele => {
        ele.leave_request_can_upload_to_sap_ui = false;
        ele.leave_request_checkbox_ui = false;
      });
      this.selectedLeaveList = [];
    }
    console.log("changeCheckBox -> this.selectedLeaveList ", this.selectedLeaveList);
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



