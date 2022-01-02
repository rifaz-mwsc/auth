import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../../shared/services/duty-roster-base.service';
import { SweetalertService } from './../../../../../../core/services/sweetalert/sweetalert.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-dutyroster-hr-shiftgroup',
  templateUrl: './dutyroster-hr-shiftgroup.component.html',
  styleUrls: ['./dutyroster-hr-shiftgroup.component.scss']
})
export class DutyrosterHrShiftgroupComponent implements OnInit {

  showLoader: boolean;
  requestList: any;
  pagination: any = [];
  apiDataService: any = [];

  localStorePagination: any = [];
  currentPage: number;

  // Add New
  newShiftGroup: any = [];

  showDeletedShiftGroups: boolean;

  @Input() userRole: any;
  @Output() selectedShiftgroup: EventEmitter<string> = new EventEmitter<string>();

  constructor(private sweetalertBase: SweetalertService, private dutyRosterBase: DutyRosterBaseService) {
    this.getMyLeaveRequestForPageOneOnly(1);
    this.localStorePagination.currentPage = 1;
    console.log('userRole', this.userRole);
  }

  ngOnInit() {
    this.showDeletedShiftGroups = false;
  }

  selectShiftGroup(shiftgroup) {
    if (shiftgroup.IsDeleted) {
      const alert = {
        type: 'error',
        title: 'Shiftgroup is Deleted',
        text: 'Please enable shiftgroup to Continue',
      };
      this.sweetalertBase.showSwalAlert(alert);
    } else {
      this.dutyRosterBase.getShiftGroupById(shiftgroup.Id).subscribe(data => {
        console.log('selectShift', data);
        this.selectedShiftgroup.emit(data);
      });
    }
  }

  onKeydownAddShiftGroup(event) {

  }

  deleteShiftGroup(shiftgroup) {
    if (shiftgroup.IsDeleted == true) {
      console.log('ShiftGroup', shiftgroup.Name, 'Restore Successfully');
    } else {
      console.log('ShiftGroup', shiftgroup.Name, 'Deleted Successfully');
    }
  }


  hideAddShiftGroupModal() {
    $('#AddShiftGroupModal').modal('hide');
  }

  showAddShiftGroupModal() {
    $('#AddShiftGroupModal').modal('show');
  }

  addShiftGroup() {

  }

  // First Page Data from Server
  getMyLeaveRequestForPageOneOnly(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.pagination.PageSize = 50;
    this.pagination.PageNumber = pageNo;
    this.pagination.ShowDeleted = true;
    this.dutyRosterBase.postShiftGroupsAll(
      {
        ShowDeleted: this.pagination.ShowDeleted,
        PageSize: this.pagination.PageSize,
        PageNumber: this.pagination.PageNumber
      }
    ).subscribe(data => {
      console.log('requestList data', data);
      // Gernerating Array with All Pages
      if (data.PaginationInfo.TotalPages > 0 && !this.apiDataService.pageData) {
        // (paginationTotalPages, paginationPageSize, paginationTotalItemCount)
        const paginationTotalPages = data.PaginationInfo.TotalPages;
        const paginationPageSize = data.PaginationInfo.PageSize;
        const paginationTotalItemCount = data.PaginationInfo.ItemCount;
        const pageData = data.Result;
        this.generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData);
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  // Page Data by PageNo from Server
  getMyLeaveRequestFromPagination(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.pagination.PageSize = 50;
    this.pagination.PageNumber = pageNo;
    this.pagination.ShowDeleted = true;
    this.dutyRosterBase.postShiftGroupsAll(
      {
        ShowDeleted: this.pagination.ShowDeleted,
        PageSize: this.pagination.PageSize,
        PageNumber: this.pagination.PageNumber
      }
    ).subscribe(data => {
      this.requestList = [];
      if (this.apiDataService.length > 0) {
        this.showLoader = true;
        this.apiDataService.forEach(ele => {
          this.showLoader = true;
          if (ele.pagination.pageNo === this.pagination.PageNumber) {
            this.showLoader = true;
            this.localStorePagination.currentPage = ele.pagination.pageNo;
            this.localStorePagination.currentPageItemNoStart = ele.pagination.pageItemNoStart;
            this.localStorePagination.currentPageItemNoEnd = ele.pagination.pageItemNoEnd;
            console.log('this.localStorePagination.currentPage', this.localStorePagination.currentPage);
            // ele.pageData = data.Result;
            this.requestList = data.Result;
            console.log('getMyLeaveRequestFromPagination', this.requestList);
            console.log('requestList', this.requestList);
          }
        });
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  // Pagination goto Previous Page - First Page Check
  getMyLeaveRequestFromPaginationPrv(currentPage) {
    if (this.localStorePagination.pageNoStart === currentPage) {
      console.log('Current Page is First Page');
    } else {
      this.getMyLeaveRequestFromPagination(currentPage);
    }
  }


  // Pagination goto Previous Page - Last Page Check
  getMyLeaveRequestFromPaginationNext(currentPage) {
    if (this.localStorePagination.pageNoEnd === currentPage) {
      console.log('Current Page is Last Page');
    } else {
      this.getMyLeaveRequestFromPagination(currentPage);
    }
  }


  viewDetails() {
    console.log('viewDetails -> Clicked');
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
      this.apiDataService.push(pagination);
    }
    console.log('generateAllPages', this.apiDataService);
    localStorage.setItem('LeaveRequestWithPagination', JSON.stringify(this.apiDataService));
  }




}
