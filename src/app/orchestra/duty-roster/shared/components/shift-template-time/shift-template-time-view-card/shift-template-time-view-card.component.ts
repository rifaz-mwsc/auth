import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-shift-template-time-view-card',
  templateUrl: './shift-template-time-view-card.component.html',
  styleUrls: ['./shift-template-time-view-card.component.scss']
})
export class ShiftTemplateTimeViewCardComponent implements OnInit {

  selectedData: any;
  modelDataArray: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;

  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // @ViewChild(LeaveAddHandoverModelComponent, { static: false }) LeaveAddHandoverModelComponent: LeaveAddHandoverModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.LeaveAddHandoverModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveCancelModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveSendForApprovalModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveSendForRecallModelComponent.resetApiErrorModal('fromParent');
  }

  gotoTime(template){

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
