import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

import { HrAuthDashboardRemoveComponent } from '../hr-auth-dashboard-remove/hr-auth-dashboard-remove.component';
import { HrAuthDashboardSetAsDefaultComponent } from '../hr-auth-dashboard-set-as-default/hr-auth-dashboard-set-as-default.component';
import { HrAuthDashboardSetExpiryComponent } from '../hr-auth-dashboard-set-expiry/hr-auth-dashboard-set-expiry.component';

@Component({
  selector: 'app-hr-auth-dashboard-view',
  templateUrl: './hr-auth-dashboard-view.component.html',
  styleUrls: ['./hr-auth-dashboard-view.component.scss']
})
export class HrAuthDashboardViewComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  //
  validFromDate: any;
  validToDate: any;
  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() requestList: any;

  @Input() showLoader: boolean;


  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrAuthDashboardRemoveComponent, { static: false }) HrAuthDashboardRemoveComponent: HrAuthDashboardRemoveComponent;
  @ViewChild(HrAuthDashboardSetAsDefaultComponent, { static: false }) HrAuthDashboardSetAsDefaultComponent: HrAuthDashboardSetAsDefaultComponent;
  @ViewChild(HrAuthDashboardSetExpiryComponent, { static: false }) HrAuthDashboardSetExpiryComponent: HrAuthDashboardSetExpiryComponent;

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.HrAuthDashboardRemoveComponent.resetApiErrorModal('fromParent');
    this.HrAuthDashboardSetAsDefaultComponent.resetApiErrorModal('fromParent');
    this.HrAuthDashboardSetExpiryComponent.resetApiErrorModal('fromParent');
  }

  setAsDefault(obj) {
  }


  hideRemoveModal() {
    this.requestToRefresh('hideRemoveModal');
    this.resetApiErrorModal('hideRemoveModal');
    $('#RemoveModal').modal('hide');
  }

  showRemoveModal(selecteditem) {
    console.log('showRemoveModal selecteditem -> ', selecteditem);
    this.requestDetails = selecteditem;
    this.selecteditem = selecteditem;
    $('#RemoveModal').modal('show');
  }



  hideSetExpiryModal() {
    this.requestToRefresh('hideSetExpiryModal');
    this.resetApiErrorModal('hideSetExpiryModal');
    $('#SetExpiryModal').modal('hide');
  }

  showSetExpiryModal(selecteditem) {
    console.log('showSetExpiryModal selecteditem -> ', selecteditem);

    this.requestDetails = selecteditem;
    this.selecteditem = selecteditem;

    let dashboard_valid_from = moment(this.selecteditem.dashboard_valid_from_on_friendly, 'DD MMM YYYY');
    let dashboard_valid_to = moment(this.selecteditem.dashboard_valid_to_on_friendly, 'DD MMM YYYY')

    this.validFromDate = dashboard_valid_from.toDate();;
    this.validToDate =  dashboard_valid_to.toDate();;

    console.log('this.validFromDate', this.validFromDate);

    $('#SetExpiryModal').modal('show');
  }



  hideSetAsDefaultModal() {
    this.requestToRefresh('hideSetAsDefaultModal');
    this.resetApiErrorModal('hideSetAsDefaultModal');
    $('#SetAsDefaultModal').modal('hide');
  }

  showSetAsDefaultModal(selecteditem) {
    console.log('showSetAsDefaultModal selecteditem -> ', selecteditem);
    this.requestDetails = selecteditem;
    this.selecteditem = selecteditem;
    $('#SetAsDefaultModal').modal('show');
  }



  remove(obj) {
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
