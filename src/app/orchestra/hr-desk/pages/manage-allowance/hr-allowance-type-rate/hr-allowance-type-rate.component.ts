import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from '../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { HrAllowanceTypeRateService } from './../../../shared/services/manage-allowance/hr-allowance-type-rate.service';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-type-rate',
  templateUrl: './hr-allowance-type-rate.component.html',
  styleUrls: ['./hr-allowance-type-rate.component.scss']
})
export class HrAllowanceTypeRateComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Data List - API
  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;
  // UI -
  viewType: any = 'table-view';
  // Filter
  showFilters: boolean = true;
  isChecked: boolean = false;
  // Show Filter Loader
  showFilterLoader: boolean = false;
  // Filter
  allowanceName: any = '';
  allowanceValidityDate: any = '';
  // Filter - DropDown
  divisionList: any = [];
  // Filter - DropDown - Disable Input
  divisionId: any = '';
  divisionName: any = '';
  disableDivision: boolean = true;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _toastr: ToastrService,
    private _organisationBase: OrganizationBaseService,
    private _hrLeaveRequestsBase: LeaveRequestsBaseService,
    private _hrAllowanceTypeRateBase: HrAllowanceTypeRateService) {
    this.getRequestForPageOneOnlyWithFilter(1);
  }

  ngOnInit() {
  }


  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('getRequestForPageOneOnlyWithFilter pageNo', pageNo);
    console.log('getRequestForPageOneOnlyWithFilter defaultPaginationSize', this.defaultPaginationSize);
    console.log('getRequestForPageOneOnlyWithFilter this.allowanceName', this.allowanceName);
    console.log('getRequestForPageOneOnlyWithFilter this.allowanceValidityDate', this.allowanceValidityDate);
    this._hrAllowanceTypeRateBase.getAllowanceTypeRateListWithFilters(pageNo, this.defaultPaginationSize, this.allowanceName, this.allowanceValidityDate).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      if (data.total_pages > 0 && !this.requestListWithPagination.pageData) {
        const paginationTotalPages = data.total_pages;
        const paginationPageSize = this.defaultPaginationSize;
        const paginationTotalItemCount = data.total_count;
        // this.leaveList = [];
        // data.items.forEach(ele => {
        //   this.leaveFilter = {
        //     leave_request_absence_type_description: ele.leave_request_absence_type_description,
        //     leave_request_http_error_status: '',
        //     leave_request_http_error_message: '',
        //     leave_request_http_error_model_state: '',
        //     leave_request_checkbox_ui: false,
        //   };
        //   this.leaveList.push(this.leaveFilter);
        // });
        // const pageData = this.leaveList;

        const pageData = data.items;
        this.generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData);
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  // Page Data by PageNo from Server
  getRequestFromPagination(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    console.log('getRequestFromPagination this.allowanceName', this.allowanceName);
    console.log('getRequestFromPagination this.allowanceValidityDate', this.allowanceValidityDate);
    this._hrAllowanceTypeRateBase.getAllowanceTypeRateListWithFilters(pageNo, this.defaultPaginationSize, this.allowanceName, this.allowanceValidityDate).subscribe((data: any) => {
      if (this.requestListWithPagination.length > 0) {
        this.showLoader = true;
        this.requestListWithPagination.forEach(ele => {
          this.showLoader = true;
          if (ele.pagination.pageNo === pageNo) {
            this.showLoader = true;
            this.localStorePagination.currentPage = ele.pagination.pageNo;
            this.localStorePagination.currentPageItemNoStart = ele.pagination.pageItemNoStart;
            this.localStorePagination.currentPageItemNoEnd = ele.pagination.pageItemNoEnd;
            // this.leaveList = [];
            // data.items.forEach(ele => {
            //   this.leaveFilter = {
            //     leave_request_absence_type_description: ele.leave_request_absence_type_description,
            //     leave_request_http_error_status: '',
            //     leave_request_http_error_message: '',
            //     leave_request_http_error_model_state: '',
            //     leave_request_checkbox_ui: false,
            //   };
            //   this.leaveList.push(this.leaveFilter);
            // });
            // this.requestList = this.leaveList;
            const pageData = data.items;
            console.log('getRequestFromPagination', this.requestList);
            console.log('requestList', this.requestList);
          }
        });
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'oh snap! unknown error occurred';
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  // Pagination goto Previous Page - First Page Check
  getRequestFromPaginationPrv(currentPage) {
    // console.log('getRequestFromPaginationPrv', currentPage);
    if (this.localStorePagination.pageNoStart === currentPage) {
      console.log('Current Page is First Page');
    } else {
      this.getRequestFromPagination(currentPage);
    }
  }


  // Pagination goto Previous Page - Last Page Check
  getRequestFromPaginationNext(currentPage) {
    // console.log('getRequestFromPaginationNext', currentPage);
    if (this.localStorePagination.pageNoEnd === currentPage) {
      console.log('Current Page is Last Page');
    } else {
      this.getRequestFromPagination(currentPage);
    }
  }

  // Gernate Pagination Array and assign first Page Data from Server
  generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData) {
    for (let i = 1; i <= paginationTotalPages; i++) {
      let tempPageData;
      let tempPageItemNoStart;
      let tempPageItemNoEnd;

      if (i < paginationTotalPages) {
        tempPageItemNoEnd = i * paginationPageSize;
        tempPageItemNoStart = tempPageItemNoEnd - paginationPageSize + 1;
      } else if (i <= paginationTotalPages) {
        tempPageItemNoEnd = paginationTotalItemCount;
        const temp = i * paginationPageSize;
        tempPageItemNoStart = temp - paginationPageSize + 1;
      }

      if (i === 1) {
        tempPageData = pageData;
        this.requestList = pageData;
        console.log('requestList', this.requestList);
        this.localStorePagination.currentPage = i;
        this.localStorePagination.currentPageItemNoStart = tempPageItemNoStart;
        this.localStorePagination.currentPageItemNoEnd = tempPageItemNoEnd;
        this.localStorePagination.totalItemCount = paginationTotalItemCount;
        this.localStorePagination.pageNoStart = i;
        this.localStorePagination.pageNoEnd = paginationTotalPages;
        console.log('localStorePagination', this.localStorePagination);
      } else {
        tempPageData = [];
      }

      const paginationObj = {
        pageNo: i,
        totalPages: paginationTotalPages,
        pageSize: paginationPageSize,
        pageItemNoStart: tempPageItemNoStart,
        pageItemNoEnd: tempPageItemNoEnd,
        totalItemCount: paginationTotalItemCount,
      };
      const pagination = {
        pagination: paginationObj,
        pageData: tempPageData,
      };
      this.requestListWithPagination.push(pagination);
    }
    console.log('generateAllPages', this.requestListWithPagination);
    localStorage.setItem('requestWithPagination', JSON.stringify(this.requestListWithPagination));
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

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    // console.log('onChangeEvent ->', this.selectLeaveType);
    this.modelStateError = null;
    this.generalApiError = null;
    // this.disableSaveButton = false;
  }

  public refreshApiData() {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('refreshApiData -> Parent ', 'allowance-type-rate',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
