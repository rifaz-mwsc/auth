import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-remote-employee-view-table',
  templateUrl: './hr-remote-employee-view-table.component.html',
  styleUrls: ['./hr-remote-employee-view-table.component.scss']
})
export class HrRemoteEmployeeViewTableComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }


  hideViewUpdateRequestModal() {
    $('#TableViewUpdateRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewUpdateRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRemoveRequestModal() {
    $('#TableViewRemoveRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRemoveRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewRemoveRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRequestModal() {
    $('#TableViewRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


}
