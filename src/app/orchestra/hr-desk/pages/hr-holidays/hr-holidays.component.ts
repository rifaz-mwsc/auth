import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../environments//environment';
// API Data Services
import { HrHolidaysBaseService } from './../../shared/services/holidays/hr-holidays-base.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-holidays',
  templateUrl: './hr-holidays.component.html',
})
export class HrHolidaysComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'holidays' }
  // API Data
  showLoader: boolean;
  request: any = { items: [], pagination: [], total_pages: 0 };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Filter
  searchText: any = '';
  // Create New Holiday
  newHoliday: any = [];
  holidayType: any = [];
  selectedHolidayType: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;


  @ViewChild('ViewCreateAddHolidayModal', { static: false }) ViewCreateAddHolidayModal: ElementRef;

  constructor(
    private hrHolidaysBase: HrHolidaysBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.getRequestForPageOneOnlyWithFilter(1);

    // holiday_type 0 - Government
    // holiday_type 1 - Public
    // holiday_type 2 - Company

    this.holidayType = [
      { Id: 0, Description: 'Government' },
      { Id: 1, Description: 'Public' },
      { Id: 2, Description: 'Company' },
    ];
  }

  ngOnInit() {
  }

  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.request = [];
    // getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, Duration, sapUploadStatus, approvalStatus, division, department) {
    this.hrHolidaysBase.getHRDeskHolidayWithFilters(pageNo, this.defaultPaginationSize, this.searchText).subscribe((data: any) => {
      console.log('request data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
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
    this.hrHolidaysBase.getHRDeskHolidayWithFilters(pageNo, this.defaultPaginationSize, this.searchText).subscribe((data: any) => {
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


  checkValue(event: any) {
    console.log(event);
    if (event === 'showFilters') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
  }


  changeHolidayType(event) {
    console.log('changeDocumentType', event);
    console.log('changeDocumentType', event.target.value);
  }

  // holiday_type 0 - Government
  // holiday_type 1 - Public
  // holiday_type 2 - Company

  // tslint:disable-next-line:no-var-keyword
  // var date = $('#newHolidayholidayDate').data('datetimepicker').getDate();
  // this.newHoliday.holidayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours + ':' + date.getMinutes() + ':' + date.getSeconds();
  // alert(formatted);

  // Step 4 - Contact Information
  postHRDeskCreateHoliday() {
    this.showLoader = true;
    this.generalApiError = null;
    this.modelStateError = null;
    console.log('holiday_name', this.newHoliday.holidayName);
    console.log('holiday_date', this.newHoliday.holidayDate);
    console.log('holiday_type', this.selectedHolidayType);
    this.hrHolidaysBase.postHRDeskCreateHoliday(
      {
        holiday_name: this.newHoliday.holidayName,
        holiday_date: this.newHoliday.holidayDate,
        holiday_type: this.selectedHolidayType,
      }
    ).subscribe(data => {
      console.log('updateContactInformation', data);
      this.toastr.success('New Holiday', 'New Holiday Created', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.newHoliday.holidayName = null;
      this.newHoliday.holidayDate = null;
      this.selectedHolidayType = null;
      this.showLoader = false;
      this.hideViewCreateAddHolidayModal();
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


  hideViewCreateAddHolidayModal() {
    $('#ViewCreateAddHolidayModal').modal('hide');
    this.refreshApiData();
  }

  showViewCreateAddHolidayModal() {
    $('#ViewCreateAddHolidayModal').modal('show');
  }


  public refreshApiData() {
    this.showLoader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
