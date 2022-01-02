import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { DutyrosterShiftTimeTemplateBaseService } from '../../shared/services/dutyroster-shift-time-template-base.service';
import { environment } from '../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-dutyroster-hr-shift-template',
  templateUrl: './dutyroster-hr-shift-template.component.html',
  styleUrls: ['./dutyroster-hr-shift-template.component.scss']
})
export class DutyrosterHrShiftTemplateComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;

  //
  showDeleted: boolean = true;

  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Filter
  employeeId: any = '';
  leaveType: any = '';
  division: any = '';
  department: any = '';
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

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(private hrDutyrosterShiftTimeTemplateBase: DutyrosterShiftTimeTemplateBaseService) {
    this.getRequestForPageOneOnly(1);
  }

  ngOnInit() {
  }

  getRequestForPageOneOnly(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    // getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, Duration, sapUploadStatus, approvalStatus,, department) {
    this.hrDutyrosterShiftTimeTemplateBase.getDutyRosterGetShiftTemplatesAll().subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      // if (data.PaginationInfo.TotalPages > 0 && !this.requestListWithPagination.pageData) {
      //   const paginationTotalPages = data.PaginationInfo.TotalPages;
      //   const paginationPageSize = this.defaultPaginationSize;
      //   const paginationTotalItemCount = data.PaginationInfo.ItemCount;
      //   this.leaveList = [];
      //   const pageData = data.Result;
      //   this.generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData);
      // }
      this.requestList = data;
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
    // this.showLoader = true;
    // this.requestList = [];
    // this.hrDutyrosterManageShiftgroupBase.postDutyRosterGetShiftGroupAll(
    //   {
    //     ShowDeleted: this.showDeleted,
    //     PageSize: this.defaultPaginationSize,
    //     PageNumber: pageNo
    //   }
    // ).subscribe((data: any) => {
    //   if (this.requestListWithPagination.length > 0) {
    //     this.showLoader = true;
    //     this.requestListWithPagination.forEach(ele => {
    //       this.showLoader = true;
    //       if (ele.pagination.pageNo === pageNo) {
    //         this.showLoader = true;
    //         this.localStorePagination.currentPage = ele.pagination.pageNo;
    //         this.localStorePagination.currentPageItemNoStart = ele.pagination.pageItemNoStart;
    //         this.localStorePagination.currentPageItemNoEnd = ele.pagination.pageItemNoEnd;
    //         this.requestList = data.Result;
    //         console.log('getRequestFromPagination', this.requestList);
    //         console.log('requestList', this.requestList);
    //       }
    //     });
    //   }
    //   this.showLoader = false;
    // }, (error: Response | any) => {
    //   if (error.status === 400) {
    //     this.generalApiError = error.error.error_message;
    //     this.modelStateError = error.error.errors;
    //     console.log('error 400', error);
    //   } else if (error.status === 403) {
    //     this.generalApiError = 'Authorization Error! You are not authorized to view this content';
    //   } else if (error.status === 0 || error.status === 500 || error.status === 501) {
    //     this.generalApiError = 'oh snap! unknown error occurred';
    //   } else {
    //     console.log('error other', error);
    //     this.generalApiError = error.error.error_message;
    //   }
    //   this.showLoader = false;
    //   return throwError(new Error(error.status));
    // });
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
    this.getRequestForPageOneOnly(1);
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateModal() {
    $('#ViewCreateModal').modal('show');
  }


  refreshApiData(){
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnly(1);
  }

}
