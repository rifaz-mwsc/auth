import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shiftgroup-manage-years-view-table',
  templateUrl: './shiftgroup-manage-years-view-table.component.html',
  styleUrls: ['./shiftgroup-manage-years-view-table.component.scss']
})
export class ShiftgroupManageYearsViewTableComponent implements OnInit {

  // This Model - Loader
  @Input() showLoader: boolean = false;
  // Parent Component Data
  @Input() shiftGroupEmployees: any;
  @Input() shiftGroupSupervisors: any;
  @Input() shiftGroupYears: any;
  @Input() selectedView: any;
  @Input() selectedShiftGroupId: any;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  gotoWeeklyShift(year) {
    this.router.navigate(['/hr-dutyroster', {outlets: {pages: ['manage-weekly-shift', this.selectedShiftGroupId, year]}}]);
  }
}
