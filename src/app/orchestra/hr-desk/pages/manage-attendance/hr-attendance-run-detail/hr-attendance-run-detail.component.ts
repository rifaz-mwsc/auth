import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LeaveRequestsBaseService } from '../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { HrAttendanceRunService } from './../../../shared/services/manage-attendance/hr-attendance-run.service';
import { HrAllowanceTypeService } from './../../../shared/services/manage-allowance/hr-allowance-type.service';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-attendance-run-detail',
  templateUrl: './hr-attendance-run-detail.component.html',
  styleUrls: ['./hr-attendance-run-detail.component.scss']
})
export class HrAttendanceRunDetailComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // API Data
  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;
  // UI -
  viewType: any = 'table-view';
  // Filter
  showFilters: boolean = true;
  isChecked: boolean = false;
  // Show Filter Loader
  showFilterLoader: boolean = false;
  // Selected Route
  selectedAttendanceRunId: any = '';
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Models - View Models
  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  // @ViewChild(HrAllowanceTypeCreateComponent, { static: false }) HrAllowanceTypeCreateComponent: HrAllowanceTypeCreateComponent;

  constructor(
    private _toastr: ToastrService,
    private _attendanceRun: HrAttendanceRunService,
    // private _attendanceRun: HrAllowanceTypeService,
    private _organisationBase: OrganizationBaseService,
    private _hrLeaveRequestsBase: LeaveRequestsBaseService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,) {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.selectedAttendanceRunId = params.get('Id')
      console.log('selectedAttendanceRunId -> ', this.selectedAttendanceRunId);
      this.getRequestForDetailPage(this.selectedAttendanceRunId);
    });
  }


  ngOnInit() {
  }


  ngAfterViewInit() {
    // this.HrAllowanceTypeCreateComponent.resetApiErrorModal('fromParent');
  }

  
  getRequestForDetailPage(attendanceRunId) {
    this.showLoader = true;
    this.requestList = [];
    this._attendanceRun.getAttendanceRunById(attendanceRunId).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.requestList = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  public refreshApiData() {
    this.showLoader = true;
    this.requestList = [];
    console.log('refreshApiData -> Parent ', 'allowance-type',);
    // this.getRequestForDetailPage(1);
  }
}
