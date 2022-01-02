import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss']
})
export class AttendanceDetailComponent implements OnInit {

  moduleName: any = 'Attendance Automation';
  pageName: any = 'Generate Daily Attendance';

  showLoader: boolean;
  requestList: any;
  pagination: any = [];
  apiDataService: any = [];

  localStorePagination: any = [];
  currentPage: number;

  constructor() {
  }


  ngOnInit() {
  }

}
