import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-shiftgroup-view-list',
  templateUrl: './shiftgroup-view-list.component.html',
  styleUrls: ['./shiftgroup-view-list.component.scss']
})
export class ShiftgroupViewListComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

  pagination: any = [];
  apiDataService: any = [];

  localStorePagination: any = [];
  currentPage: number;



  daysCount: any;
  selectedData: any;
  modelDataArray: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() shiftgroupViewType: any;
  @Input() requestList: any;
  @Input() showLoader: boolean;

  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // @ViewChild(LeaveAddHandoverModelComponent, { static: false }) LeaveAddHandoverModelComponent: LeaveAddHandoverModelComponent;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private hrDutyrosterManageShiftgroupBase: DutyrosterManageShiftgroupBaseService) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    // this.LeaveAddHandoverModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveCancelModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveSendForApprovalModelComponent.resetApiErrorModal('fromParent');
    // this.LeaveSendForRecallModelComponent.resetApiErrorModal('fromParent');
  }


  showViewRecordDetailsModal(listItem) {

  }



  gotoShiftgroup(shiftGroup) {
    this.router.navigate(['/hr-dutyroster', { outlets: { pages: ['manage-shift-group', shiftGroup.Id] } }]);
  }

  gotoShift(shiftGroup) {
    this.router.navigate(['/hr-dutyroster', { outlets: { pages: ['create-shift', shiftGroup.Id] } }]);
  }

  remove(listItem) {
    this.showLoader = true;
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterShiftGroupRemove(listItem.Id).subscribe((data: any) => {
      console.log('requestList data', data);
      listItem.IsDeleted = data.IsDeleted;
      this.toastr.warning('Shiftgroup: ' + data.Name, 'Shiftgroup Removed Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to View or Access this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  restore(listItem) {
    this.showLoader = true;
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterShiftGroupRestore(listItem.Id).subscribe((data: any) => {
      console.log('requestList data', data);
      listItem.IsDeleted = data.IsDeleted;
      this.toastr.success('Shiftgroup: ' + data.Name, 'Shiftgroup Restored Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to View or Access this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
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
