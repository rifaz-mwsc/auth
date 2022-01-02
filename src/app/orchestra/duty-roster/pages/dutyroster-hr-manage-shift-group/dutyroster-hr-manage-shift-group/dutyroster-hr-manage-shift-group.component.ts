import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-dutyroster-hr-manage-shift-group',
  templateUrl: './dutyroster-hr-manage-shift-group.component.html',
  styleUrls: ['./dutyroster-hr-manage-shift-group.component.scss']
})
export class DutyrosterHrManageShiftGroupComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;

  shiftGroupManage: any ='manage';
  // Selected-ShiftGroup
  selectedShiftGroupId: any;
  selectedShiftGroup: any;
  // Mange-ShiftGroup
  shiftGroupEmployees: any;
  shiftGroupSupervisors: any;
  shiftGroupYears: any;
  //
  showDeleted: boolean = true;
  // Select a View Type
  selectedView: any;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hrDutyrosterManageShiftgroupBase: DutyrosterManageShiftgroupBaseService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.selectedShiftGroupId = params.get('shiftGroupId');
      console.log('selectedShiftGroupId ->', this.selectedShiftGroupId);
      this.getShiftGroupEmployees(this.selectedShiftGroupId);
      this.getShiftGroupSupervisors(this.selectedShiftGroupId);
      this.getShiftGroupYears(this.selectedShiftGroupId);
      this.getShiftGroupById(this.selectedShiftGroupId);
    });
    this.selectViewType('table');
  }

  getShiftGroupById(shiftGroupId) {
    this.showLoader = true;
    this.selectedShiftGroup = [];
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterGetShiftGroupById(shiftGroupId).subscribe((data: any) => {
      console.log('requestList data', data);
      this.selectedShiftGroup = data;
      console.log('selectedShiftGroup -> selectedShiftGroup', data);
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


  getShiftGroupEmployees(shiftGroup) {
    this.showLoader = true;
    this.shiftGroupEmployees = [];
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterGetShiftGroupEmployeesByShiftGroupId(shiftGroup).subscribe((data: any) => {
      console.log('requestList data', data);
      this.shiftGroupEmployees = data;
      console.log('shiftGroupEmployees -> shiftGroupEmployees', data);
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

  getShiftGroupSupervisors(shiftGroup) {
    this.showLoader = true;
    this.shiftGroupSupervisors = [];
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterGetShiftGroupSupervisorsByShiftGroupId(shiftGroup).subscribe((data: any) => {
      console.log('requestList data', data);
      this.shiftGroupSupervisors = data;
      console.log('shiftGroupSupervisors -> shiftGroupSupervisors', data);
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


  getShiftGroupYears(shiftGroup) {
    this.showLoader = true;
    this.shiftGroupYears = [];
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterGetShiftGroupYearsByShiftGroupId(shiftGroup).subscribe((data: any) => {
      console.log('requestList data', data);
      this.shiftGroupYears = data;
      console.log('getShiftGroupYears -> getShiftGroupYears', data);
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







  hideViewCreateModal() {
    $('#ViewCreateModal').modal('hide');
  }

  showViewCreateModal() {
    $('#ViewCreateModal').modal('show');
  }



  selectViewType(step) {
    console.log('selectViewType -> ', step);
    if (step === 'card') {
      this.selectedView = 'card';
    } else if (step === 'list') {
      this.selectedView = 'list';
    } else if (step === 'table') {
      this.selectedView = 'table';
    }
  }

  refreshApiData() {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('refreshApiData -> Parent ', 'Overtime');
  }
}
