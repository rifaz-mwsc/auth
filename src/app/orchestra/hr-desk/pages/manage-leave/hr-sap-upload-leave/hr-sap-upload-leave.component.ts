import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { LeaveRequestsBaseService } from '../../../shared/services/leave-requests-base.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-sap-upload-leave',
  templateUrl: './hr-sap-upload-leave.component.html',
  styleUrls: ['./hr-sap-upload-leave.component.scss']
})
export class HrSapUploadLeaveComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'leave sap-upload record' }
  // API Data
  showLoader: boolean;
  request: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.leaveUploadRequests.defaultMaxPagination;
  // Filter
  showFilters: boolean = true;
  isChecked: boolean = false;
  // Filters
  searchText: any = '';
  leaveType: any = '';
  // DropDown
  leaveTypeList: any = [];
  divisionList: any = [];
  departmentList: any = [];
  // arrange Data for Bulk 
  leaveFilter: any = [];
  leaveList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateUploadLetterModal', { static: false }) ViewCreateUploadLetterModal: ElementRef;

  constructor(
    private hrLeaveRequestsBase: LeaveRequestsBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.leaveTypeList = [
      { Id: '', Name: '-- Select Leave Type --' },
      { Id: 9000, Name: 'Annual Leave' },
      { Id: 9001, Name: 'Medical Leave' },
      { Id: 9004, Name: 'Compassionate Leave' },
      { Id: 9002, Name: 'Maternity Leave ' },
      { Id: 9003, Name: 'Paternity Leave' },
      { Id: 9005, Name: 'Circumcision Leave' },
    ];

    this.leaveType = this.leaveTypeList[0].Id;
  }

  ngOnInit() {
    this.getRequestForPageOneOnly(1);
  }


  // First Page Data from Server
  getRequestForPageOneOnly(pageNo) {
    console.log('getRequestForPageOneOnly data');
    this.showLoader = true;
    this.request = [];
    this.hrLeaveRequestsBase.getHRDeskPendingLeaveRequestsWithFilters(pageNo, this.defaultPaginationSize, this.searchText, this.leaveType).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);

      this.showLoader = true;
      for (let i = 0; i < data.items.length; i++) {
        data.items[i]['leave_request_http_error_status'] = '';
        data.items[i]['leave_request_http_error_message'] = '';
        data.items[i]['leave_request_http_error_model_state'] = '';
        data.items[i]['leave_request_checkbox_ui'] = false;
      }

      if (data.total_pages > 0) {
        this.corePaginationService.generateAllPages(this.defaultPaginationSize, data).then((listPagination: any) => {
          this.request.items = listPagination.items;
          this.request.pagination = listPagination;
          this.request.total_pages = listPagination.total_pages;
        });
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error) {
        this.coreErrorHandler.handleError(error).then((apiError: any) => {
          this.generalApiError = apiError.generalApiError;
          this.modelStateError = apiError.modelStateError;
        });
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  // Page Data by PageNo from Server
  getRequestFromPagination(pageNo) {
    this.showLoader = true;
    this.request = [];
    // this.requestListWithPagination = [];
    this.hrLeaveRequestsBase.getHRDeskPendingLeaveRequestsWithFilters(pageNo, this.defaultPaginationSize, this.searchText, this.leaveType).subscribe((data: any) => {
      this.showLoader = true;
      for (let i = 0; i < data.items.length; i++) {
        data.items[i]['leave_request_http_error_status'] = '';
        data.items[i]['leave_request_http_error_message'] = '';
        data.items[i]['leave_request_http_error_model_state'] = '';
        data.items[i]['leave_request_checkbox_ui'] = false;
      }

      if (data.total_pages) {
        this.corePaginationService.getPageFromPaginationNo(pageNo, data).then((listPagination: any) => {
          this.request.items = listPagination.items;
          this.request.pagination = listPagination;
          this.request.total_pages = listPagination.total_pages;
        });
      }

      this.showLoader = false;
    }, (error: Response | any) => {
      if (error) {
        this.coreErrorHandler.handleError(error).then((apiError: any) => {
          this.generalApiError = apiError.generalApiError;
          this.modelStateError = apiError.modelStateError;
        });
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  // Pagination goto Previous Page - First Page Check
  getRequestFromPaginationPrv(currentPage) {
    console.log('getRequestFromPaginationPrv', currentPage);
    if (currentPage === 1) {
      console.log('Current Page is First Page');
    } else {
      this.getRequestFromPagination(currentPage - 1);
    }
  }


  // Pagination goto Next Page - Last Page Check
  getRequestFromPaginationNext(currentPage) {
    console.log('getRequestFromPaginationNext', currentPage);
    if (currentPage === this.request.pagination.total_pages) {
      console.log('Current Page is Last Page');
    } else {
      this.getRequestFromPagination(currentPage + 1);
    }
  }


  // Pagination goto First Page - First Page Check
  getRequestFromPaginationFirst(currentPage) {
    console.log('getRequestFromPaginationFirst', currentPage);
    if (currentPage === 1) {
      this.getRequestFromPagination(currentPage);
    }
  }


  // Pagination goto Last Page - Last Page Check
  getRequestFromPaginationLast(currentPage) {
    console.log('getRequestFromPaginationLast', currentPage);
    if (currentPage === this.request.pagination.total_pages) {
      this.getRequestFromPagination(currentPage);
    }
  }


  checkValue(event: any) {
    console.log(event);
    if (event === 'showFilters') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
  }


  public refreshApiData() {
    this.showLoader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnly(1);
  }
}
