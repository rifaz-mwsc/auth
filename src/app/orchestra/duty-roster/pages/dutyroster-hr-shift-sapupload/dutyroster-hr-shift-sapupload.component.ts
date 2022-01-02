import { Component, OnInit } from '@angular/core';
import { DutyRosterBaseService } from './../../shared/services/duty-roster-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-dutyroster-hr-shift-sapupload',
  templateUrl: './dutyroster-hr-shift-sapupload.component.html',
  styleUrls: ['./dutyroster-hr-shift-sapupload.component.scss']
})
export class DutyrosterHrShiftSapuploadComponent implements OnInit {

  selectedData: any = [];  // Search Text Field
  showLoader: boolean;
  requestList: any;

  constructor(private dutyRosterBase: DutyRosterBaseService) {
    this.selectedData.infotype = '9010';
    this.selectedData.shiftRate = '90';
    this.selectedData.period = 'X';
  }

  ngOnInit() {
  }

  // First Page Data from Server
  getShiftUploadPendingForPageOneOnly(selectedData) {
    this.showLoader = true;
    this.requestList = [];

    this.dutyRosterBase.postShiftsEmployeeWithShiftCount(
      {
        From: selectedData.fromDate,
        To: selectedData.toDate
      }
    ).subscribe(data => {
      const selectedDatafromDate = moment(this.selectedData.fromDate).format('DD.MM.YYYY');
      const selectedDatatoDate = moment(this.selectedData.toDate).format('DD.MM.YYYY');
      data.forEach(elemt => {
        const sapuploadsData = {
          EmployeeId: elemt.EmployeeId,
          Period: this.selectedData.period,
          StartDate: selectedDatafromDate,
          EndDate: selectedDatatoDate,
          Infotype: this.selectedData.infotype,
          ShiftCount: elemt.ShiftCount,
          NormalShiftRateAt: this.selectedData.shiftRate,
          Selected: false,
        };
        this.requestList.push(sapuploadsData);
      });
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

}
