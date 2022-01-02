import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-custom-timing',
  templateUrl: './view-custom-timing.component.html',
  styleUrls: ['./view-custom-timing.component.scss']
})
export class ViewCustomTimingComponent implements OnInit {

  selectAllStaffs: any;
  selectedDate: any;

  constructor() { }

  ngOnInit() {
  }

  getGenerateAttendanceReport(selectedDate, selectAllStaffs){
    
  }

}
