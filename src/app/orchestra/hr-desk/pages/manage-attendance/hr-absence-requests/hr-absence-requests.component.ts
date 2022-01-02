import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { HrAttendanceAbsenceService } from './../../../shared/services/manage-attendance/hr-attendance-absence.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-absence-requests',
  templateUrl: './hr-absence-requests.component.html',
  styleUrls: ['./hr-absence-requests.component.scss']
})
export class HrAbsenceRequestsComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: 'absence', page_title: 'absence requests' }
  // API Data
  showLoader: boolean;
  request: any = { 'items': [], 'pagination': [], 'total_pages': 0 };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  // UI -
  viewType: any = 'tableView-absence-requests';
  // Filter
  filter: any = { show_filters: true, show_filter_loader: false, default_page_size: null, search_text: '', sap_pending_status: '', sap_status_list: null };
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  constructor(
    private hrAttendanceAbsenceBase: HrAttendanceAbsenceService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.getRequestForPageOne(1);

    this.filter.sap_status_list = [
      { Id: 1, Name: 'true', Label: 'Approved' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.filter.sap_pending_status = this.filter.sap_status_list[0].Name;
  }


  ngOnInit() {
  }


  getRequestForPageOne(pageNo) {
    this.showLoader = true;
    this.request = [];
    console.log('getRequestForPageOneOnlyWithFilter pageNo', pageNo);
    console.log('getRequestForPageOneOnlyWithFilter defaultPaginationSize', this.defaultPaginationSize);
    // getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, Duration, sapUploadStatus, approvalStatus,, department) {
    this.hrAttendanceAbsenceBase.getHRDeskPendingAbsenceSapUpload(pageNo, this.defaultPaginationSize, this.filter.search_text, this.filter.sap_pending_status).subscribe((data: any) => {
      console.log(this.pageInfo.page_title + ' -> data :: ', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.showLoader = true;
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
    this.hrAttendanceAbsenceBase.getHRDeskPendingAbsenceSapUpload(pageNo, this.defaultPaginationSize, this.filter.search_text, this.filter.sap_pending_status).subscribe((data: any) => {
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




  hideViewCreateModal() {
    $('#ViewCreateModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateModal() {
    $('#ViewCreateModal').modal('show');
  }


  showHideFilters(event: any) {
    console.log(event);
    if (event === true) {
      this.filter.show_filters = true;
    }

    if (event === false) {
      this.filter.show_filters = false;
    }
  }

  


  public refreshApiData() {
    this.showLoader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOne(1);
  }
}
