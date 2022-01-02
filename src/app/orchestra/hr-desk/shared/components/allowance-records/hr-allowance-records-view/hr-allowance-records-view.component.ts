import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
// import { HrLeaveRequestsExtendBulkModelComponent } from '../hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-allowance-records-view',
  templateUrl: './hr-allowance-records-view.component.html',
  styleUrls: ['./hr-allowance-records-view.component.scss']
})
export class HrAllowanceRecordsViewComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
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
  @ViewChild('LeaveViewTableViewDetailModal', { static: false }) LeaveViewTableViewDetailModal: ElementRef;
  @ViewChild('TableViewExtendBulkModal', { static: false }) TableViewExtendBulkModal: ElementRef;
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
