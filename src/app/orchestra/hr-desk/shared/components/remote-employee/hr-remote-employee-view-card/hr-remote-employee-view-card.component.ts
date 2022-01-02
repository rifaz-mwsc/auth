import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-remote-employee-view-card',
  templateUrl: './hr-remote-employee-view-card.component.html',
  styleUrls: ['./hr-remote-employee-view-card.component.scss']
})
export class HrRemoteEmployeeViewCardComponent implements OnInit {

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

  @ViewChild('CardViewUpdateRequestModal', { static: false }) CardViewUpdateRequestModal: ElementRef;
  @ViewChild('CardViewRemoveRequestModal', { static: false }) CardViewRemoveRequestModal: ElementRef;
  @ViewChild('CardViewRequestModal', { static: false }) CardViewRequestModal: ElementRef;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }


  hideViewUpdateRequestModal() {
    $('#CardViewUpdateRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRemoveRequestModal() {
    $('#CardViewRemoveRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRemoveRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewRemoveRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRequestModal() {
    $('#CardViewRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }

}
