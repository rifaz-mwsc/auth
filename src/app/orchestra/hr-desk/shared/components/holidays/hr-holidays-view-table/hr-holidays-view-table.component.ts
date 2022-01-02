import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { HrHolidaysBaseService } from './../../../../shared/services/holidays/hr-holidays-base.service';
import { HrHolidaysDetailViewModelComponent } from '../hr-holidays-detail-view-model/hr-holidays-detail-view-model.component';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-holidays-view-table',
  templateUrl: './hr-holidays-view-table.component.html',
  styleUrls: ['./hr-holidays-view-table.component.scss']
})
export class HrHolidaysViewTableComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedData: any;
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
  @ViewChild(HrHolidaysDetailViewModelComponent, { static: false }) HrHolidaysDetailViewModelComponent: HrHolidaysDetailViewModelComponent;

  constructor(
    private toastr: ToastrService,
    private hrHolidaysBase: HrHolidaysBaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrHolidaysDetailViewModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewRecordDetailsModal() {
    this.requestToRefresh('');
    this.resetApiErrorModal('');
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(requestData) {
    this.selectedData = [];
    this.selectedData = requestData;
    $('#TableViewRecordDetailsModal').modal('show');
    this.resetApiErrorModal('');
  }



  hideRemoveModal() {
    this.requestToRefresh('');
    this.resetApiErrorModal('');
    $('#TableViewRemoveModal').modal('hide');
  }

  showRemoveModal(selecteditem) {
    this.selectedData = [];
    this.selectedData = selecteditem;
    $('#TableViewRemoveModal').modal('show');
    this.resetApiErrorModal('');
  }




  // Remove
  postRemoveHoliday(selecteditem) {
    this.showModelLoader = true;
    this.hrHolidaysBase.postHRDeskRemoveHoliday(selecteditem.holiday_id).subscribe((data: any) => {
      this.toastr.success('Remove Holiday', 'Holiday Removed', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
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
