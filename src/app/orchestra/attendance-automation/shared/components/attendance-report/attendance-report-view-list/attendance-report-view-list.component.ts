import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-report-view-list',
  templateUrl: './attendance-report-view-list.component.html',
  styleUrls: ['./attendance-report-view-list.component.scss']
})
export class AttendanceReportViewListComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
