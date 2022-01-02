import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-dutyroster-hr-manage-weekly-shifts',
  templateUrl: './dutyroster-hr-manage-weekly-shifts.component.html',
  styleUrls: ['./dutyroster-hr-manage-weekly-shifts.component.scss']
})
export class DutyrosterHrManageWeeklyShiftsComponent implements OnInit {


  // View Type
  shiftGroupManage: any ='manage';


  selectedShiftGroup: any;

  showLoader: boolean = true;
  // Selected-ShiftGroup
  selectedShiftGroupId: any;
  selectedYear: any;
  shiftGroupWeeklyShifts: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hrDutyrosterManageShiftgroupBase: DutyrosterManageShiftgroupBaseService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.selectedShiftGroupId = params.get('selectedShiftGroupId');
      console.log('selectedShiftGroupId ->', this.selectedShiftGroupId);
      this.selectedYear = params.get('selectedYear');
      console.log('selectedYear ->', this.selectedYear);
      this.getShiftGroupById(this.selectedShiftGroupId);
      this.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroupId, this.selectedYear);
    });


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


  getWeeklyShiftsForYearsByShiftGroupId(shiftGroup, year) {
    this.showLoader = true;
    this.shiftGroupWeeklyShifts = [];
    this.hrDutyrosterManageShiftgroupBase.getDutyRosterShiftGroupWeeklyshiftByShiftGroupId(shiftGroup, year).subscribe((data: any) => {
      console.log('requestList data', data);
      this.shiftGroupWeeklyShifts = data;
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
}
