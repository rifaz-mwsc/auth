import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-daily-attendance-deatils',
  templateUrl: './generate-daily-attendance-deatils.component.html',
  styleUrls: ['./generate-daily-attendance-deatils.component.scss']
})
export class GenerateDailyAttendanceDeatilsComponent implements OnInit {

  moduleName: any = 'Attendance Automation';
  pageName: any = 'Generate Daily Attendance';

  showLoader: boolean;
  requestList: any;
  pagination: any = [];
  apiDataService: any = [];

  localStorePagination: any = [];
  currentPage: number;
  
  constructor() { }

  ngOnInit() {
  }

}
