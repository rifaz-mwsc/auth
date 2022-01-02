import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hr-attendance-absence-view',
  templateUrl: './hr-attendance-absence-view.component.html',
  styleUrls: ['./hr-attendance-absence-view.component.scss']
})
export class HrAttendanceAbsenceViewComponent implements OnInit {

  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() request: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
