import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HrLettersBaseService } from '../../../shared/services/letters/hr-letters-base.service';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-remote-employee',
  templateUrl: './hr-remote-employee.component.html',
  styleUrls: ['./hr-remote-employee.component.scss']
})
export class HrRemoteEmployeeComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean = false;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  //
  selectAllStaffs: any;
  selectedDate: any;
  // Create New
  newEmployeeId: any;
  newFromDate: any;
  newTodate: any;
  newReason: any;
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Temp - to delete later
  employeeId: any;
  duration: any;

  constructor(private toastr: ToastrService) {
    this.requestList = [
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Active'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Active'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Cancelled'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Ended'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Active'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Ended'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Cancelled'
      },
      {
        employee_id: 1222, employee_name: 'Mohamed Suoodh', employee_name_with_id: 'Mohamed Suoodh (1222)', employee_division: "ICT", employee_department: "Information Systems",
        employee_section: "ERP & Application Management", from_date: '2020-12-21T13:55:51.2548963', to_date: '2020-12-31T13:55:51.2548963', status: 'Active'
      }
    ];
  }

  ngOnInit() {
  }

  checkValue(event: any) {
    console.log(event);
    if (event === 'showFilters') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    this.modelStateError = null;
    this.generalApiError = null;
    this.disableSaveButton = false;
  }

  hideViewAddRequestModal() {
    $('#ViewAddRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewAddRequestModal() {
    $('#ViewAddRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }




  create() {
    this.disableSaveButton = true;
    this.generalApiError = null;
    this.modelStateError = null;
    this.showModelLoader = true;
    this.showModelLoader = true;
    // this.staffPortalOvertimeBase.postStaffPortalOvertimeNewRequest(
    //   {
    //     overtime_prior_approval_Id: this.priorApprovalId,
    //     overtime_request_planned_from: this.plannedFrom,
    //     overtime_request_planned_to: this.plannedTo,
    //     overtime_request_location: this.location,
    //     overtime_request_work_details: this.workDetails,
    //     overtime_request_remarks: this.remarks,
    //   }
    // ).subscribe((data: any) => {
    //   this.toastr.info('Created', 'New Overtime', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
    //   this.disableSaveButton = false;
    //   this.showModelLoader = false;
    // }, (error: Response | any) => {
    //   console.log('getMyLeaveRequestForPageOneOnly -> error', error);
    //   if (error.status === 400) {
    //     this.generalApiError = error.error.error_message;
    //     this.modelStateError = error.error.errors;
    //     console.log('error 400', error);
    //   } else if (error.status === 0 || error.status === 400 || error.status === 400) {
    //     this.generalApiError = 'oh snap! unknown error occurred';
    //   } else {
    //     this.generalApiError = error.error.error_message;
    //   }
    //   this.disableSaveButton = true;
    //   this.showModelLoader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  getRequestForPageOneOnlyWithFilter(pageNo){

  }

}
