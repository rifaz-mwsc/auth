import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-report-view-table',
  templateUrl: './attendance-report-view-table.component.html',
  styleUrls: ['./attendance-report-view-table.component.scss']
})
export class AttendanceReportViewTableComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;
  
  constructor() { }

  ngOnInit() {
  }

  viewDetailAttendenceReport(report) {
    
  }

}
