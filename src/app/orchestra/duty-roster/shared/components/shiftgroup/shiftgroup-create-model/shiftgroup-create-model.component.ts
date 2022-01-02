import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DutyRosterBaseService } from './../../../../shared/services/duty-roster-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-shiftgroup-create-model',
  templateUrl: './shiftgroup-create-model.component.html',
  styleUrls: ['./shiftgroup-create-model.component.scss']
})
export class ShiftgroupCreateModelComponent implements OnInit {

  newShiftGroup: any = [];

  constructor(private dutyRosterBase: DutyRosterBaseService) { }

  ngOnInit() {
  }

  addNewShiftGroups() {
    this.dutyRosterBase.postShiftGroupsNew(
      {
        Name: this.newShiftGroup.Name,
        Description: this.newShiftGroup.Description
      }
    ).subscribe(value => {
      // this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shift Group', 1000);
      console.log('Hooray!', 'You have added a new Shift Group');
      // this.newShiftGroup.Name = null;
      // this.newShiftGroup.Description = null;
      // this.shiftGroups.push(value);
    });
  }



  onKeydownAddShiftGroup(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftGroups();
    }
  }

}
