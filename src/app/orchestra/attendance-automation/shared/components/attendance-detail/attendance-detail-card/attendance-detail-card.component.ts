import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-detail-card',
  templateUrl: './attendance-detail-card.component.html',
  styleUrls: ['./attendance-detail-card.component.scss']
})
export class AttendanceDetailCardComponent implements OnInit {

  attendanceDetail: any;

  constructor() {
    this.attendanceDetail = [
      { attendanceType: 'Punch In', attendanceCode: 'PI', TotalRecords: 500, TotalPercentage: 55.55, TotalEmployees: 900 },
      { attendanceType: 'Annual', attendanceCode: 'An', TotalRecords: 50, TotalPercentage: 5.55, TotalEmployees: 900 },
      { attendanceType: 'Maternity', attendanceCode: 'Ma', TotalRecords: 20, TotalPercentage: 2.22, TotalEmployees: 900 },
      { attendanceType: 'Paternity', attendanceCode: 'Pa', TotalRecords: 20, TotalPercentage: 2.22, TotalEmployees: 900 },
      { attendanceType: 'Compassionate', attendanceCode: 'Co', TotalRecords: 50, TotalPercentage: 5.55, TotalEmployees: 900 },
      { attendanceType: 'Circumcision', attendanceCode: 'Ci', TotalRecords: 10, TotalPercentage: 1.11, TotalEmployees: 900 },
      { attendanceType: 'Self Medical', attendanceCode: 'Ms', TotalRecords: 50, TotalPercentage: 5.55, TotalEmployees: 900 },
      { attendanceType: 'Medical', attendanceCode: 'Mc', TotalRecords: 50, TotalPercentage: 5.55, TotalEmployees: 900 },
      { attendanceType: 'Unauthorised', attendanceCode: 'U', TotalRecords: 150, TotalPercentage: 16.66, TotalEmployees: 900 },
    ];
  }

  ngOnInit() {
  }

}
