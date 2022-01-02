import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttendanceBaseService } from './../../shared/services/attendance-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-generate-daily-attendance',
  templateUrl: './generate-daily-attendance.component.html',
  styleUrls: ['./generate-daily-attendance.component.scss']
})
export class GenerateDailyAttendanceComponent implements OnInit {

  showLoader: boolean;
  requestList: any;
  selectedDate: any;
  selectAllStaffs: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(private attendanceBase: AttendanceBaseService) {
  }

  ngOnInit() {
  }

  // First Page Data from Server
  getGenerateAttendanceReport(selectedDate, selectAllStaffs) {
    // this.showLoader = true;
    // this.requestList = [];

    // this.attendanceBase.postGenerateAttendanceReport(
    //   {
    //     Date: selectedDate,
    //     selectStaffs: selectAllStaffs
    //   }
    // ).subscribe(data => {
    //   this.requestList = data.requestData;
    //   console.log('requestList', this.requestList);
    //   this.showLoader = false;
    // }, (error: Response | any) => {
    //   this.showLoader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  hideViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('show');
  }

}
