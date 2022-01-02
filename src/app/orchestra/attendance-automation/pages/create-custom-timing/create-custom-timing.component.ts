import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-custom-timing',
  templateUrl: './create-custom-timing.component.html',
  styleUrls: ['./create-custom-timing.component.scss']
})
export class CreateCustomTimingComponent implements OnInit {

  selectAllStaffs: any;
  selectedDate: any;

  constructor() { }

  ngOnInit() {
  }

  getGenerateAttendanceReport(selectedDate, selectAllStaffs){

  }

}
