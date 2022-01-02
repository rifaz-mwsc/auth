import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-shiftgroup-manage-supervisors-view-list',
  templateUrl: './shiftgroup-manage-supervisors-view-list.component.html',
  styleUrls: ['./shiftgroup-manage-supervisors-view-list.component.scss']
})
export class ShiftgroupManageSupervisorsViewListComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

  // showLoader: boolean;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // This Model - Loader
  @Input() showLoader: boolean = false;
  // Parent Component Data
  @Input() shiftGroupEmployees: any;
  @Input() shiftGroupSupervisors: any;
  @Input() shiftGroupYears: any;
  @Input() selectedView: any;

  constructor(private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private hrDutyrosterManageShiftgroupBase: DutyrosterManageShiftgroupBaseService) { }

  ngOnInit() {
  }

  remove(listItem) {
    this.showLoader = true;
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterShiftGroupSupervisorRemove(listItem.Id).subscribe((data: any) => {
      console.log('requestList data', data);
      listItem.IsRemoved = data.IsRemoved;
      this.toastr.warning('Supervisor: ' + data.Name +' ('+data.EmployeeId+' )', 'Supervisor Removed Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
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
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterShiftGroupSupervisorRestore(listItem.Id).subscribe((data: any) => {
      console.log('requestList data', data);
      listItem.IsRemoved = data.IsRemoved;
      this.toastr.success('Supervisor: ' + data.Name +' ('+data.EmployeeId+' )', 'Supervisor Restored Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
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
}
