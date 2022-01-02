import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-report-view-card',
  templateUrl: './attendance-report-view-card.component.html',
  styleUrls: ['./attendance-report-view-card.component.scss']
})
export class AttendanceReportViewCardComponent implements OnInit {

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
