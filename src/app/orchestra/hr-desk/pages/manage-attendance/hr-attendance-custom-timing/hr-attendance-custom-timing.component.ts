import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { LeaveRequestsBaseService } from './../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { HrAllowanceTypeService } from './../../../shared/services/manage-allowance/hr-allowance-type.service';
import { HrAttendanceCustomTimingService } from './../../../shared/services/manage-attendance/hr-attendance-custom-timing.service';
import { HrAllowanceTypeCreateComponent } from './../../../shared/components/allowance-type/hr-allowance-type-create/hr-allowance-type-create.component';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-attendance-custom-timing',
  templateUrl: './hr-attendance-custom-timing.component.html',
  styleUrls: ['./hr-attendance-custom-timing.component.scss']
})
export class HrAttendanceCustomTimingComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'letters' }
  showLoader: boolean;
  request: any = { 'items': [], 'pagination': [], 'total_pages': 0 };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.letterRequests.defaultMaxPagination;
  // defaultPaginationSize: any = 5;
  // UI -
  viewType: any = 'table-view';
    // Filter
  filter: any = { 'showFilters': true, 'isChecked': false, 'search': null, 'planned_date': null, 'hide_deleted_items': null};
  // Filter
  showFilters: boolean = true;
  isChecked: boolean = false;
  // Show Filter Loader
  showFilterLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Models - View Models
  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrAllowanceTypeCreateComponent, { static: false }) HrAllowanceTypeCreateComponent: HrAllowanceTypeCreateComponent;

  constructor(
    private _toastr: ToastrService,
    private _attendanceCustomTimingService: HrAttendanceCustomTimingService,
    private _organisationBase: OrganizationBaseService,
    private _hrLeaveRequestsBase: LeaveRequestsBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.getRequestForPageOneOnlyWithFilter(1);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrAllowanceTypeCreateComponent.resetApiErrorModal('fromParent');
  }


  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.request = [];
    console.log('getRequestForPageOneOnlyWithFilter pageNo', pageNo);
    console.log('getRequestForPageOneOnlyWithFilter defaultPaginationSize', this.defaultPaginationSize);
    this._attendanceCustomTimingService.getAttendanceCustomTimingListWithFilters(pageNo, this.defaultPaginationSize, this.filter.search, this.filter.planned_date, this.filter.hide_deleted_items).subscribe((data: any) => {
      console.log('requestList data', data);
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
    this._attendanceCustomTimingService.getAttendanceCustomTimingListWithFilters(pageNo, this.defaultPaginationSize, this.filter.search, this.filter.planned_date, this.filter.hide_deleted_items).subscribe((data: any) => {
      this.showLoader = true;
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
    this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewCreateModal() {
    $('#ViewCreateModal').modal('show');
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
    console.log('refreshApiData -> Parent ', 'allowance-type',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }


}
