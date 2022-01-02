import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../../shared/services/hr-ot-requests-base.service';
import { environment } from './../../../../../../../environments/environment';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-hr-upload-ot-upload-bulk-model',
  templateUrl: './hr-upload-ot-upload-bulk-model.component.html',
  styleUrls: ['./hr-upload-ot-upload-bulk-model.component.scss']
})
export class HrUploadOtUploadBulkModelComponent implements OnInit {

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
    title: 'Overtime SAP Upload Report',
    useBom: true,
    noDownload: false,
    headers: ["Employee", "From Date", "To Date", "Work Details", "Remarks", "Location", "Status", "Message", "Message Details"]
  };

  // overtime_request_employee_details: selectedArryObj.overtime_request_employee_details,
  // overtime_request_planned_from: selectedArryObj.overtime_request_planned_from,
  // overtime_request_planned_to: selectedArryObj.overtime_request_planned_to,
  // overtime_request_work_details: selectedArryObj.overtime_request_work_details,
  // overtime_request_remarks: selectedArryObj.overtime_request_remarks,
  // overtime_request_location: selectedArryObj.overtime_request_location,

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

    if (this.selectedOtList === undefined || this.selectedOtList == null || this.selectedOtList.length <= 0) {
      this.generalApiError = 'Please fill all required fields';
      this.showModelLoader = false;
    } else {
      this.uploadReport = [];
      this.selectedOtList.forEach((selectedArryObj, index) => {
        this.leaveRequestsBase.postHRDeskSAPUploadOvertimeRequests({ overtime_request_id: selectedArryObj.overtime_request_id })
          .subscribe((data: any) => {
            this.toastr.success('Uploaded to SAP', 'OT Uploaded to SAP', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
            this.showModelLoader = false;
            selectedArryObj.overtime_request_http_error_status = 200;
            selectedArryObj.overtime_request_http_error_message = 'OT Request Uploaded to SAP';
            selectedArryObj.overtime_request_http_error_model_state = '';

          }, (error: Response | any) => {
            console.log('getMyLeaveRequestForPageOneOnly -> error', error);
            if (error.status === 400) {
              // this.generalApiError = error.error.error_message;
              // this.modelStateError = error.error.errors;
              // console.log('error 400', error);
              // selectedArryObj.overtime_request_http_error_status = error.status;
              // selectedArryObj.overtime_request_http_error_message = error.error.error_message;
              // selectedArryObj.overtime_request_http_error_model_state = error.error.errors;

              console.log('error 401', error.error.error_message);
              console.log('error 401', error.error.errors);

              let Title = 'Oh snap! Error (400)';
              let Text = 'An error has occured';

              Title = error.error.error_message;
              if (error.error.errors.ModelState) {
                Text = '';
                // tslint:disable-next-line:prefer-const
                for (let key in error.error.errors.ModelState) {
                  if (Array.isArray(error.error.errors.ModelState[key]) && error.error.errors.ModelState[key].length > 0) {
                    Text += key.replace('model.', '') + ': ';
                    // tslint:disable-next-line:forin
                    for (let subkey in error.error.errors.ModelState[key]) {
                      // Text += error.error.errors.ModelState[key][subkey] + '<br/>';
                      Text += error.error.errors.ModelState[key][subkey] + '';
                    }
                  } else if (error.error.errors.ModelState[key].length > 0) {
                    // Text += key.replace('model.', '') + ': ' + error.error.errors.ModelState[key] + '<br/>';
                    Text += key.replace('model.', '') + ': ' + error.error.errors.ModelState[key] + '';
                  }
                }
              }

              this.generalApiError = Title;
              this.modelStateError = Text;
              console.log('error 400', error);
              selectedArryObj.overtime_request_http_error_status = error.status;
              selectedArryObj.overtime_request_http_error_message = Title;
              selectedArryObj.overtime_request_http_error_model_state = Text;

            } else if (error.status === 403) {
              this.generalApiError = 'Authorization Error! You are not authorized to view this content';
              console.log('error 403', error);
              selectedArryObj.overtime_request_http_error_status = error.status;
              selectedArryObj.overtime_request_http_error_message = 'Authorization Error! You are not authorized to view this content';
            } else if (error.status === 0 || error.status === 500 || error.status === 501) {
              this.generalApiError = 'oh snap! unknown error occurred';
              console.log('error 500', error);
              selectedArryObj.overtime_request_http_error_status = error.status;
              selectedArryObj.overtime_request_http_error_message = 'oh snap! unknown error occurred';
            } else {
              console.log('error other', error);
              this.generalApiError = error.error.error_message;
              selectedArryObj.overtime_request_http_error_status = error.status;
              selectedArryObj.overtime_request_http_error_message = 'oh snap! unknown error occurred';
            }
            this.toastr.warning(selectedArryObj.overtime_request_http_error_message + ' - ' + selectedArryObj.overtime_request_http_error_status, selectedArryObj.overtime_request_http_error_model_state, { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
            this.showModelLoader = false;
            return throwError(new Error(error.status));
          });

        // let uploadReportObj = {
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

        // console.log('this.selectedOtList', this.selectedOtList);
        // console.log('this.uploadReport', this.uploadReport);
      });
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
    new AngularCsv(this.uploadReport, "Leave SAP Upload Report", this.csvOptions);
  }



  callBulk(selectedArryObj) {
    this.leaveRequestsBase.postHRDeskSAPUploadOvertimeRequests(
      {
        overtime_request_id: selectedArryObj.overtime_request_id,
      }
    ).subscribe((data: any) => {
      console.log('create data', data);
      this.toastr.success('Uploaded to SAP', 'OT Uploaded to SAP', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      selectedArryObj.overtime_request_http_error_status = 200;
      selectedArryObj.overtime_request_http_error_message = 'OT Request Uploaded to SAP';
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
        this.generalApiError = 'oh snap! unknown error occurred';
        console.log('error 500', error);
        selectedArryObj.overtime_request_http_error_status = error.status;
        selectedArryObj.overtime_request_http_error_message = 'oh snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
        selectedArryObj.overtime_request_http_error_status = error.status;
        selectedArryObj.overtime_request_http_error_message = 'oh snap! unknown error occurred';
      }
      this.toastr.warning(selectedArryObj.overtime_request_http_error_message + ' - ' + selectedArryObj.overtime_request_http_error_status, selectedArryObj.overtime_request_http_error_model_state, { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
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
