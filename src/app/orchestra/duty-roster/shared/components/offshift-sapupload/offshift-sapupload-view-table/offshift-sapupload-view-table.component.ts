import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../../shared/services/duty-roster-base.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-offshift-sapupload-view-table',
  templateUrl: './offshift-sapupload-view-table.component.html',
  styleUrls: ['./offshift-sapupload-view-table.component.scss']
})
export class OffshiftSapuploadViewTableComponent implements OnInit {

  // daysCount: any;
  selectedData: any;
  modelDataArray: any = [];

  offshiftFileExport: any = [];         // (Export Data)
  offshiftSapBulkUpload: any = [];      // (Bulk Upload Function Data)
  selectSAPuploadsAll: boolean;
  nowDateTime: any;                     // CSV Export with Current Time
  numShiftId: number;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  @Output() selectSapUploadx: EventEmitter<string> = new EventEmitter<string>();
  @Output() unselectSapUploadx: EventEmitter<string> = new EventEmitter<string>();
  @Output() bulkUploaded: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dutyRosterBase: DutyRosterBaseService) {
    this.selectSAPuploadsAll = false;
  }

  ngOnInit() {
  }


  unselect(listItem) {
    console.log('Child unselect', listItem);
    this.unselectSapUploadx.emit(listItem);
    console.log('Child unselect', listItem);
  }

  select(listItem) {
    console.log('Child select', listItem);
    this.selectSapUploadx.emit(listItem);
    console.log('Child select', listItem);
  }

  updateSelected(selectedData, event: any) {
    if (event.target.checked) {
      console.log('selected', selectedData);
      console.log('checkbox', event.target.checked);
      this.selectSapUploadx.emit(selectedData);
      this.requestList.forEach(elemt => {
        if (selectedData.ShiftId === elemt.ShiftId) {
          const sapuploadsExport = {
            EmployeeId: elemt.EmployeeId, AbsenceTypeId: elemt.AbsenceTypeId,
            Start: '', End: '',                 // Time
            From: elemt.From, To: elemt.To,     // Date
            ShiftId: elemt.ShiftId,
            Selected: elemt.Selected,
          };
          this.offshiftFileExport.push(sapuploadsExport);
        }
      });
      console.log('selectedData', this.offshiftFileExport);
    } else {
      console.log('Unselected', selectedData);
      this.unselectSapUploadx.emit(selectedData);
      console.log('checkbox', event.target.checked);
      this.offshiftFileExport.forEach(exportItem => {
        if (selectedData.ShiftId === exportItem.ShiftId) {
          const removeSapuploadsExportItem = this.offshiftFileExport.indexOf(exportItem);
          this.offshiftFileExport.splice(removeSapuploadsExportItem, 1);
          console.log('removeSelected - sapuploadsExport Data ->', removeSapuploadsExportItem);
        }
      });
      console.log('selectedData', this.offshiftFileExport);
    }
  }

  updateSelectedAll(event: any) {
    if (event.target.checked) {
      this.offshiftFileExport = [];
      if (this.selectSAPuploadsAll === true) {
        this.requestList.forEach(elemt => {
          this.selectSapUploadx.emit(elemt);
          // tslint:disable-next-line:max-line-length
          const sapuploadsExport = {
            EmployeeId: elemt.EmployeeId, AbsenceTypeId: elemt.AbsenceTypeId,
            Start: '', End: '',                 // Time
            From: elemt.From, To: elemt.To,     // Date
            ShiftId: elemt.ShiftId,
            Selected: elemt.Selected,
          };
          this.offshiftFileExport.push(sapuploadsExport);
          console.log('Checked All');
          console.log('selectedData', this.offshiftFileExport);
        });
        this.selectSAPuploadsAll = true;
      } else {
        this.selectSAPuploadsAll = false;
        console.log('Unchecked All');
        console.log('selectedData', this.offshiftFileExport);
        this.requestList.forEach(elemt => {
          this.unselectSapUploadx.emit(elemt);
        });
      }
    } else {
      this.requestList.forEach(elemt => {
        this.unselectSapUploadx.emit(elemt);
      });
      this.offshiftFileExport = [];
      this.selectSAPuploadsAll = false;
      console.log('Unchecked All');
      console.log('selectedData', this.offshiftFileExport);
    }

  }



  downloadCSV() {
    if (this.offshiftFileExport.length > 0) {
      swal({
        title: 'Export DutyRoster Data?',
        text: 'Do you want export DutyRoster Data?',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        reverseButtons: true
      }).then((willDelete) => {
        if (willDelete.value) {
          this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
          // tslint:disable-next-line:no-construct
          const reportTitle = new String('HR_OffShift_SAP_Upload_Data_');
          const title = reportTitle.concat(this.nowDateTime);
          console.log('ReportTitleWithDate :', title);
          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'HR OffShift SAP Upload Data',
            // useBom: true,
            // noDownload: true,
            headers: ['EmployeeId', 'AbsenceTypeId', 'Start', 'End', 'From', 'To']
          };
          // tslint:disable-next-line:no-unused-expression
          new AngularCsv(this.offshiftFileExport, title, options);
          // console.log('Upload Data', this.offshiftFileExport);
          this.offshiftFileExport = [];
          this.selectSAPuploadsAll = false;
          swal('Hooray!', 'Export DutyRoster Data Successfully. :)', 'success');
        } else {
          swal('Failed!', 'Request Cancelled. :(', 'error');
        }
        // console.log(willDelete);
      });
    } else {
      swal('Cancelled!', 'No Data Found. :(', 'error');
      // console.log('Cancel Request -> No Data Found');
    }
  }


  uploadToSap() {
    this.offshiftSapBulkUpload = [];
    this.offshiftFileExport.forEach(elemt => {
      const shiftIds = {
        ShiftId: Number(elemt.ShiftId),
      };
      this.offshiftSapBulkUpload.push(shiftIds);
      console.log('selectedData', this.offshiftSapBulkUpload);
    });


    if (this.offshiftSapBulkUpload.length > 0) {
      swal({
        title: 'Upload DutyRoster Data to SAP?',
        text: 'Do you want Upload DutyRoster Data to SAP?',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        reverseButtons: true
      }).then((willDelete) => {
        if (willDelete.value) {

          this.offshiftSapBulkUpload.forEach(elemt => {
            this.numShiftId = 0;
            console.log('offshiftSapBulkUpload', elemt);
            // const numShiftId = this.ConvertStringToNumber(elemt.ShiftId);
            this.numShiftId = this.ConvertStringToNumber(elemt.ShiftId);
            console.log('offshiftSapBulkUpload', this.numShiftId);
            // Shift_Ids: Number(elemt.ShiftId)
            this.dutyRosterBase.postShiftsMarkAsUploadToSAP(
              {
                Shift_Ids: this.numShiftId
              }
            ).subscribe((data: any) => {
              if (data) {
                this.bulkUploaded.emit('true');
                // console.log('Hooray!', 'Uploaded SAP Data Successfully', data);
              }
            }, (error: Response | any) => {
              this.showLoader = false;
              return throwError(new Error(error.status));
            });
          });

          // for (i = 0; i <= max; i++) {
          //   console.log('getShiftsSAPBulkUpload', this.shiftIds[i]);
          //   this.dutyRosterBase.postShiftsMarkAsUploadToSAP(
          //     {
          //       Shift_Ids: this.shiftIds
          //     }
          //   ).subscribe((data: any) => {
          //     console.log('Hooray!', 'Uploaded SAP Data Successfully', data);
          //   },
          //     (error: Response | any) => {
          //       return Observable.throw(new Error(error.status));
          //     });
          // }
          this.offshiftSapBulkUpload = [];
          this.offshiftFileExport = [];
          this.selectSAPuploadsAll = false;
          swal('Hooray!', 'Export DutyRoster Data Successfully. :)', 'success');
        } else {
          swal('Failed!', 'Request Cancelled. :(', 'error');
        }
        // console.log(willDelete);
      });
    } else {
      swal('Cancelled!', 'No Data Found. :(', 'error');
      // console.log('Cancel Request -> No Data Found');
    }
  }


  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
  }

}
