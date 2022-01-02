import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hr-attendance-run-full-detail-view',
  templateUrl: './hr-attendance-run-full-detail-view.component.html',
  styleUrls: ['./hr-attendance-run-full-detail-view.component.scss']
})
export class HrAttendanceRunFullDetailViewComponent implements OnInit {


  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
