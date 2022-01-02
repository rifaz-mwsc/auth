import { Component, OnInit } from '@angular/core';
import { AttendanceBaseService } from './../../../../shared/services/attendance-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  showLoader: boolean;
  requestList: any;

  constructor(private attendanceBase: AttendanceBaseService) { }

  ngOnInit() {
  }


  // First Page Data from Server
  getGenerateAttendanceReport(selectedDate) {
    this.showLoader = true;
    this.requestList = [];
    this.attendanceBase.postGenerateAttendanceReport(
      {
        Date: selectedDate,
      }
    ).subscribe(data => {
      this.requestList = data;
      console.log('requestList', this.requestList);
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

}
