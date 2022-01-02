import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../../shared/services/duty-roster-base.service';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-dutyroster-hr-weeklyshift-manage',
  templateUrl: './dutyroster-hr-weeklyshift-manage.component.html',
  styleUrls: ['./dutyroster-hr-weeklyshift-manage.component.scss']
})
export class DutyrosterHrWeeklyshiftManageComponent implements OnInit {

  theNull: null;

  weeklyShiftYearList: any;
  shiftTemplates: any;
  selectedWeeklyShifts: any;

  @Input() selectedShiftgroup: any;
  @Output() unselectedShiftgroup: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private router: Router,
    private dutyRosterBase: DutyRosterBaseService) {
      // this.initializeWeeklyShift();
  }

  ngOnInit() {
  }

  unSelectShiftGroup() {
    this.unselectedShiftgroup.emit(this.theNull);
  }


  initializeWeeklyShift() {
    this.getShiftTemplatesAll();
    console.log('initializeWeeklyShiftsTab');
    this.selectedWeeklyShifts = null;
    this.getWeeklyShiftsYearList();
  }


  getWeeklyShiftsYearList() {
    this.dutyRosterBase.getWeeklyShiftYearsByShiftGroupId(this.selectedShiftgroup.Id).subscribe(data => {
      this.weeklyShiftYearList = data;
      console.log('getWeeklyShiftsYearList - yearList Data ->', this.weeklyShiftYearList);
    });
  }

  getShiftTemplatesAll() {
    this.dutyRosterBase.getShiftTemplatesAll().subscribe(data => {
      this.shiftTemplates = data;
      console.log('getShiftTemplatesAll - Data ->', this.shiftTemplates);
    }, (error: Response | any) => {
      return Observable.throw(new Error(error.status));
    });
  }


  hideAddWeeklyShiftModal() {
    $('#AddWeeklyShiftModal').modal('hide');
  }

  showAddWeeklyShiftModal() {
    $('#AddWeeklyShiftModal').modal('show');
  }

  hideAddEmployeeModal() {
    $('#AddEmployeeModal').modal('hide');
  }

  showAddEmployeeModal() {
    $('#AddEmployeeModal').modal('show');
  }

  hideAddSuperviorModal() {
    $('#AddSuperviorModal').modal('hide');
  }

  showAddSuperviorModal() {
    $('#AddSuperviorModal').modal('show');
  }

}
