import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HrLettersBaseService } from './../../../../shared/services/letters/hr-letters-base.service';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-hr-letters-upload-bulk-model',
  templateUrl: './hr-letters-upload-bulk-model.component.html',
})
export class HrLettersUploadBulkModelComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

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
    title: 'Upload Report :',
    useBom: true,
    noDownload: false,
    headers: ["Title", "Employee ID", "File Name", "File Name with extention", "Status", "Message", "Message Details"]
  };

  showLoader: boolean;
  // Upload
  fileList: File[] = [];
  newLetter: any = [];
  newLetterEmployeeId: any;
  newLetterTitle: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Error Log
  errorLog: any;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private hrLettersBase: HrLettersBaseService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  addDocument(event) {
    this.showLoader = true;
    this.uploadReport = [];
    let employeeId = '';
    this.httpStatus = '';
    this.httpMessage = '';
    this.httpModelState = '';

    console.log('employeeId', employeeId)
    // formData.append('DocumentType_Id', selectedDocumentType);
    // formData.append('Application_Id', this.selectedUtilityApplicationId);
    // formData.append('UploadedDocument', file);

    if (this.newLetterTitle === undefined || this.newLetterTitle == null || this.newLetterTitle.length <= 0) {
      this.generalApiError = 'Please fill all required fields';
      this.showLoader = false;
    } else {
      this.fileList.push(...event.addedFiles);
      const formData = new FormData();
      for (var i = 0; i < this.fileList.length; i++) {
        this.httpStatus = '';
        this.httpMessage = '';
        this.httpModelState = '';
        // formData.append('file[]', this.fileList[i]);
        formData.append('letter_uploaded_document', this.fileList[i]);
        console.log('this.fileList -> this.fileList', this.fileList);
        employeeId = this.fileList[i].name.replace('.pdf', '');
        console.log('this.fileList -> employeeId', employeeId);

        this.hrLettersBase.postHRDeskUploadDocument(formData, employeeId, this.newLetterTitle).subscribe((res: any) => {
          console.log(res);
          this.fileList = [];
          this.httpStatus = 200;
          this.httpMessage = "Documents Uploaded Successfully";
          this.httpModelState = '';
          this.toastr.success('Employee: ' + res.leave_request_employee_details, 'Documents Uploaded Successfully', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
        }, (error: Response | any) => {
          console.log('getMyLeaveRequestForPageOneOnly -> error', error);
          if (error.status === 400 || error.status === 400) {
            this.generalApiError = error.error.error_message;
            this.modelStateError = error.error.errors;
            console.log('error 400', error);
            this.httpStatus = error.status;
            this.httpMessage = error.error.error_message;
            this.httpModelState = error.error.errors;
          } else if (error.status === 0 || error.status === 500 || error.status === 501) {
            this.generalApiError = 'oh snap! unknown error occurred';
            this.httpStatus = error.status;
            this.httpMessage = 'oh snap! unknown error occurred';
          } else {
            this.generalApiError = error.error.error_message;
            this.httpStatus = error.status;
            this.httpMessage = error.error.error_message;
          }
          this.toastr.warning('Employee: ' + employeeId, 'Failed to Upload Document', { closeButton: true, timeOut: this.modelCloseTimeOut_4, progressBar: true, enableHtml: true });
          this.showLoader = false;
          return throwError(new Error(error.status));
        });
        const uploadReportObj = {
          upload_report_title: this.newLetterTitle,
          upload_report_employee_Id: employeeId,
          upload_report_file_name: employeeId,
          upload_report_file_name_with_extention: this.fileList[i].name,
          upload_report_http_status: this.httpStatus,
          upload_report_http_message: this.httpMessage,
          upload_report_http_model_state: this.httpModelState,
        };
        this.uploadReport.push(uploadReportObj);
        console.log('for Loop End');
      }
      this.fileList = [];
    }
    setTimeout(() => {
      this.closeModel();
      this.downloadCSVReport();
    }, this.modelCloseTimeOut_3);
  }

  removeDocument(event) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }


  downloadCSVReport() {
    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new AngularCsv(this.uploadReport, "Upload Report", this.csvOptions);
  }


  formatErrorLog(error) {
    this.errorLog = [];
    let xhttpStatus: any = '';
    let xhttpMessage: any = '';
    let xhttpModelState: any = '';
    if (error.status === 400 || error.status === 400) {
      this.generalApiError = error.error.error_message;
      this.modelStateError = error.error.errors;
      console.log('error 400', error);
      this.httpStatus = error.status;
      this.httpMessage = error.error.error_message;
      this.httpModelState = error.error.errors;
      xhttpStatus = error.status;
      xhttpMessage = error.error.error_message;
      xhttpModelState = error.error.errors;
    } else if (error.status === 0 || error.status === 500 || error.status === 501) {
      this.generalApiError = 'oh snap! unknown error occurred';
      this.httpStatus = error.status;
      this.httpMessage = 'oh snap! unknown error occurred';
    } else {
      this.generalApiError = error.error.error_message;
      this.httpStatus = error.status;
      this.httpMessage = error.error.error_message;
    }
    const uploadReportObj = {
      upload_report_http_status: xhttpStatus,
      upload_report_http_message: xhttpMessage,
      upload_report_http_model_state: xhttpModelState,
    };
    this.errorLog.push(uploadReportObj);
    xhttpStatus = '';
    xhttpMessage = '';
    xhttpModelState = '';

    return this.errorLog;
  }

  closeModel() {
    this.resetApiErrorModal('');
    this.closeThisModel.emit(null);
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
