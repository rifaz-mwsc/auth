import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../../shared/services/hr-ot-requests-base.service';
import { environment } from './../../../../../../../environments/environment';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-hr-ot-requests-extend-bulk-model',
  templateUrl: './hr-ot-requests-extend-bulk-model.component.html',
  styleUrls: ['./hr-ot-requests-extend-bulk-model.component.scss']
})
export class HrOtRequestsExtendBulkModelComponent implements OnInit {

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
    title: 'Overtime Extend Report',
    useBom: true,
    noDownload: false,
    headers: ["Employee", "From Date", "To Date", "Work Details", "Remarks", "Location", "Status", "Message", "Message Details"]
  };

  newExpiryDate: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data
  @Input() selectedOtList: any;
  @Input() showModelLoader: boolean;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private leaveRequestsBase: HrOtRequestsBaseService) { }

  ngOnInit() {
  }


  extend() {
    this.resetApiErrorModal('extend');
    this.showModelLoader = true;

    if (this.newExpiryDate === undefined || this.newExpiryDate == null || this.newExpiryDate.length <= 0 ||
      this.selectedOtList === undefined || this.selectedOtList == null || this.selectedOtList.length <= 0) {
      this.generalApiError = 'Please fill all required fields';
      this.showModelLoader = false;
    } else {
      this.uploadReport = [];
      this.selectedOtList.forEach(selectedArryObj => {
        console.log('selectedOtList', selectedArryObj);

        this.leaveRequestsBase.postHRDeskExtendOvertimeRequests(
          {
            overtime_request_id: selectedArryObj.overtime_request_id,
            overtime_request_new_expiry_date: this.newExpiryDate,
          }
        ).subscribe((data: any) => {
          console.log('create data', data);
          this.toastr.success('Extented', 'OT Request Extented', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
          this.showModelLoader = false;
          selectedArryObj.overtime_request_http_error_status = 200;
          selectedArryObj.overtime_request_http_error_message = 'Overtime Request Extented';
          selectedArryObj.overtime_request_http_error_model_state = '';
        }, (error: Response | any) => {
          console.log('getMyLeaveRequestForPageOneOnly -> error', error);
          if (error.status === 400) {
            this.generalApiError = error.error.error_message;
            this.modelStateError = error.error.errors;
            console.log('error 400', error);
            selectedArryObj.overtime_request_http_error_status = error.status;
            selectedArryObj.overtime_request_http_error_message = error.error.error_message;
            selectedArryObj.overtime_request_http_error_model_state = error.error.errors;
          } else if (error.status === 403) {
            this.generalApiError = 'Authorization Error! You are not authorized to view this content';
            console.log('error 403', error);
            selectedArryObj.overtime_request_http_error_status = error.status;
            selectedArryObj.overtime_request_http_error_message = 'Authorization Error! You are not authorized to view this content';
          } else if (error.status === 0 || error.status === 500 || error.status === 501) {
            this.generalApiError = 'Oh Snap! unknown error occurred';
            console.log('error 500', error);
            selectedArryObj.overtime_request_http_error_status = error.status;
            selectedArryObj.overtime_request_http_error_message = 'Oh Snap! unknown error occurred';
          } else {
            console.log('error other', error);
            this.generalApiError = error.error.error_message;
            selectedArryObj.overtime_request_http_error_status = error.status;
            selectedArryObj.overtime_request_http_error_message = 'Oh Snap! unknown error occurred';
          }
          this.toastr.warning(selectedArryObj.overtime_request_http_error_message + ' - ' + selectedArryObj.overtime_request_http_error_status , selectedArryObj.overtime_request_http_error_model_state, { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
          this.showModelLoader = false;
          return throwError(new Error(error.status));
        });

        // const uploadReportObj = {
        //   overtime_request_employee_details: selectedArryObj.overtime_request_employee_details,
        //   overtime_request_planned_from: selectedArryObj.overtime_request_planned_from,
        //   overtime_request_planned_to: selectedArryObj.overtime_request_planned_to,
        //   overtime_request_work_details: selectedArryObj.overtime_request_work_details,
        //   overtime_request_remarks: selectedArryObj.overtime_request_remarks,
        //   overtime_request_location: selectedArryObj.overtime_request_location,

        //   http_status: selectedArryObj.overtime_request_http_error_status,
        //   http_message: selectedArryObj.overtime_request_http_error_message,
        //   http_model_state: selectedArryObj.overtime_request_http_error_model_state,
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
    this.selectedOtList.forEach((selectedArryObj) => {
      let uploadReportObj = {
        overtime_request_employee_details: selectedArryObj.overtime_request_employee_details,
        overtime_request_planned_from: selectedArryObj.overtime_request_planned_from,
        overtime_request_planned_to: selectedArryObj.overtime_request_planned_to,
        overtime_request_work_details: selectedArryObj.overtime_request_work_details,
        overtime_request_remarks: selectedArryObj.overtime_request_remarks,
        overtime_request_location: selectedArryObj.overtime_request_location,

        http_status: selectedArryObj.overtime_request_http_error_status,
        http_message: selectedArryObj.overtime_request_http_error_message,
        http_model_state: selectedArryObj.overtime_request_http_error_model_state,
      };

      console.log('selectedArryObj.overtime_request_http_error_status,', selectedArryObj.overtime_request_http_error_status);
      console.log('selectedArryObj.overtime_request_http_error_message', selectedArryObj.overtime_request_http_error_message);
      console.log('selectedArryObj.overtime_request_http_error_model_state', selectedArryObj.overtime_request_http_error_model_statet);

      this.uploadReport.push(uploadReportObj);
      console.log('this.selectedOtList', this.selectedOtList);
      console.log('this.uploadReport', this.uploadReport);
    });

    
    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new AngularCsv(this.uploadReport, "Overtime Extend Report", this.csvOptions);
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
    console.log(functionName,' -> modelStateError - ', this.modelStateError);
    console.log(functionName,' -> generalApiError - ', this.generalApiError);
  }
}
