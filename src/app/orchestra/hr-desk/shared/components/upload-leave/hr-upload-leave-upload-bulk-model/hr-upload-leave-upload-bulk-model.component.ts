import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../../shared/services/leave-requests-base.service';
import { environment } from './../../../../../../../environments/environment';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-hr-upload-leave-upload-bulk-model',
  templateUrl: './hr-upload-leave-upload-bulk-model.component.html',
  styleUrls: ['./hr-upload-leave-upload-bulk-model.component.scss']
})
export class HrUploadLeaveUploadBulkModelComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  bulkCreatModeleCloseTimeOut: any = environment.appConfig.hrDesk.common.bulkUploadModelCloseTimeOut;

  // Bulk Create Report
  uploadReport: any;
  bulkCreateReport: any;
  httpStatus: any;
  httpMessage: any;
  httpModelState: any;
  // Bulk Create Report - Headers
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Leave SAP Upload Report',
    useBom: true,
    noDownload: false,
    headers: ["Employee", "Leave Type", "From Date", "To Date", "Status", "Message", "Message Details"]
  };

  newExpiryDate: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() selectedLeaveList: any;
  @Input() showModelLoader: boolean;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private leaveRequestsBase: LeaveRequestsBaseService) { }

  ngOnInit() {
  }

  extend() {
    this.resetApiErrorModal('extend');
    this.showModelLoader = true;

    if (this.selectedLeaveList === undefined || this.selectedLeaveList == null || this.selectedLeaveList.length <= 0) {
      this.generalApiError = 'Please fill all required fields';
      this.showModelLoader = false;
    } else {
      this.uploadReport = [];
      this.selectedLeaveList.forEach(selectedArryObj => {
        console.log('selectedOtList', selectedArryObj);
        this.leaveRequestsBase.postHRDeskSAPUploadLeaveRequests(
          {
            leave_request_id: selectedArryObj.leave_request_id,
          }
        ).subscribe((data: any) => {
          console.log('create data', data);
          this.toastr.success('Uploaded to SAP', 'Leave Uploaded to SAP', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
          this.showModelLoader = false;
          selectedArryObj.leave_request_http_error_status = 200;
          selectedArryObj.leave_request_http_error_message = 'Leave Request Uploaded to SAP';
          selectedArryObj.leave_request_http_error_model_state = '';

        }, (error: Response | any) => {
          console.log('getMyLeaveRequestForPageOneOnly -> error', error);
          if (error.status === 400) {
            this.generalApiError = error.error.error_message;
            this.modelStateError = error.error.errors;
            console.log('error 400', error);
            selectedArryObj.leave_request_http_error_status = error.status;
            selectedArryObj.leave_request_http_error_message = error.error.error_message;
            selectedArryObj.leave_request_http_error_model_state = error.error.errors;
          } else if (error.status === 0 || error.status === 500 || error.status === 501) {
            this.generalApiError = 'oh snap! unknown error occurred';
            console.log('error 500', error);
            selectedArryObj.leave_request_http_error_status = error.status;
            selectedArryObj.leave_request_http_error_message = 'oh snap! unknown error occurred';
          } else {
            console.log('error other', error);
            this.generalApiError = error.error.error_message;
            selectedArryObj.leave_request_http_error_status = error.status;
            selectedArryObj.leave_request_http_error_message = 'oh snap! unknown error occurred';
          }
          this.toastr.warning(selectedArryObj.leave_request_http_error_message + ' - ' + selectedArryObj.leave_request_http_error_status, selectedArryObj.leave_request_http_error_model_state, { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
          this.showModelLoader = false;
          return throwError(new Error(error.status));
        });
        // const uploadReportObj = {
        //   leave_request_employee_id: selectedArryObj.leave_request_employee_id,
        //   leave_request_absence_type_sap_id: selectedArryObj.leave_request_absence_type_sap_id,
        //   leave_request_taken_from: selectedArryObj.leave_request_taken_from,
        //   leave_request_taken_to: selectedArryObj.leave_request_taken_to,

        //   http_status: selectedArryObj.leave_request_http_error_status,
        //   http_message: selectedArryObj.leave_request_http_error_message,
        //   http_model_state: selectedArryObj.leave_request_http_error_model_state,
        // };
        // this.uploadReport.push(uploadReportObj);
        // console.log('for Loop End');
      })
    }
    if (environment.production === false && environment.api_server === 'localhost') {
      setTimeout(() => {
        this.downloadCSVReport();
      }, 10000);
    }
    this.closeModel();
  }

  downloadCSVReport() {
    this.selectedLeaveList.forEach((selectedArryObj) => {
      let uploadReportObj = {
        leave_request_employee_id: selectedArryObj.leave_request_employee_id,
        leave_request_absence_type_sap_id: selectedArryObj.leave_request_absence_type_sap_id,
        leave_request_taken_from: selectedArryObj.leave_request_taken_from,
        leave_request_taken_to: selectedArryObj.leave_request_taken_to,

        http_status: selectedArryObj.overtime_request_http_error_status,
        http_message: selectedArryObj.overtime_request_http_error_message,
        http_model_state: selectedArryObj.overtime_request_http_error_model_state,
      };

      console.log('selectedArryObj.overtime_request_http_error_status,', selectedArryObj.overtime_request_http_error_status);
      console.log('selectedArryObj.overtime_request_http_error_message', selectedArryObj.overtime_request_http_error_message);
      console.log('selectedArryObj.overtime_request_http_error_model_state', selectedArryObj.overtime_request_http_error_model_statet);
      this.uploadReport.push(uploadReportObj);
      console.log('this.selectedLeaveList', this.selectedLeaveList);
      console.log('this.uploadReport', this.uploadReport);
    });

    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new AngularCsv(this.uploadReport, "Leave SAP Upload Report", this.csvOptions);
  }



  closeModel() {
    this.resetApiErrorModal('');
    setTimeout(() => {
      this.closeThisModel.emit(null);
    }, this.bulkCreatModeleCloseTimeOut);
  }

  resetApiErrorModal(functionName) {
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> modelStateError - ', this.modelStateError);
    console.log(functionName, ' -> generalApiError - ', this.generalApiError);
  }
}
