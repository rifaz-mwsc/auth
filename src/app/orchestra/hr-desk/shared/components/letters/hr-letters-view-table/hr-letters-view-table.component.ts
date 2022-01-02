import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { HrLettersBaseService } from './../../../../shared/services/letters/hr-letters-base.service';
import { HrLettersUploadBulkModelComponent } from '../hr-letters-upload-bulk-model/hr-letters-upload-bulk-model.component';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;



@Component({
  selector: 'app-hr-letters-view-table',
  templateUrl: './hr-letters-view-table.component.html',
})
export class HrLettersViewTableComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Item Detail Model
  selecteditem: any = [];
  itemDeatils: any = [];
  // Remove Model -
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;



  // Reset Fields - Call Child Function
  @ViewChild('TableViewRecordDetailsModal', { static: false }) TableViewRecordDetailsModal: ElementRef;
  @ViewChild('TableViewRemoveModal', { static: false }) TableViewRemoveModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrLettersUploadBulkModelComponent, { static: false }) HrLettersUploadBulkModelComponent: HrLettersUploadBulkModelComponent;

  constructor(
    private toastr: ToastrService,
    private hrLettersBase: HrLettersBaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrLettersUploadBulkModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewRecordDetailsModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = [];
    this.selecteditem = selecteditem;
    $('#TableViewRecordDetailsModal').modal('show');
    this.resetApiErrorModal('');
  }




  hideRemoveModal() {
    this.resetApiErrorModal('');
    this.requestToRefresh('');
    $('#TableViewRemoveModal').modal('hide');
  }

  showRemoveModal(selecteditem) {
    this.selecteditem = [];
    this.selecteditem = selecteditem;
    $('#TableViewRemoveModal').modal('show');
    this.resetApiErrorModal('');
  }


  // Remove
  postRemove(selecteditem) {
    this.showModelLoader = true;
    this.hrLettersBase.postHRDeskRemoveLetter(selecteditem.document_id).subscribe((data: any) => {
      this.toastr.success('Remove Letter', 'Letter Removed', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this Content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });

    setTimeout(() => {
      this.hideRemoveModal();
    }, this.modelCloseTimeOut);
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
