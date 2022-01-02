import { Component, OnInit } from '@angular/core';
import { DutyRosterBaseService } from './../../shared/services/duty-roster-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dutyroster-hr-offshift-sapupload',
  templateUrl: './dutyroster-hr-offshift-sapupload.component.html',
  styleUrls: ['./dutyroster-hr-offshift-sapupload.component.scss']
})
export class DutyrosterHrOffshiftSapuploadComponent implements OnInit {

  showLoader: boolean;
  requestList: any;
  pagination: any = [];
  apiDataService: any = [];

  localStorePagination: any = [];
  currentPage: number;

  unselectSapUpload: any = [];      // Data from Child
  selectSapUpload: any = [];        // Data from Child

  constructor(private dutyRosterBase: DutyRosterBaseService) {
    this.getOffshitUploadPendingForPageOneOnly(1);
    this.localStorePagination.currentPage = 1;
  }

  ngOnInit() {
  }

  unselectSapUploads(event) {
    console.log('Parent -> selectedShiftgroup', event);
    this.unselectSapUpload = event;
    console.log('selectedShiftgroup', this.unselectSapUpload);
    this.requestList.forEach(elemt => {
      if (this.unselectSapUpload.ShiftId === elemt.ShiftId) {
        console.log('unselectSapUploads', this.unselectSapUpload.ShiftId);
        console.log('unselectSapUploads', elemt.ShiftId);
        elemt.Selected = false;
      }
    });
  }

  selectSapUploads(event) {
    console.log('Parent -> selectedShiftgroup', event);
    this.selectSapUpload = event;
    console.log('selectedShiftgroup', this.selectSapUpload);
    this.requestList.forEach(elemt => {
      if (this.unselectSapUpload.ShiftId === elemt.ShiftId) {
        console.log('selectSapUploads', this.unselectSapUpload.ShiftId);
        console.log('selectSapUploads', elemt.ShiftId);
        elemt.Selected = true;
      }
    });
  }

  bulkSapUploads(event) {
    console.log('Parent -> true', event);
    if (event === 'true') {
      this.getOffshitUploadPendingForPageOneOnly(1);
    }
  }

  // First Page Data from Server
  getOffshitUploadPendingForPageOneOnly(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.pagination.PageSize = 10;
    this.pagination.PageNumber = pageNo;

    this.dutyRosterBase.postShiftsSAPUploadPending(
      {
        PageSize: this.pagination.PageSize,
        PageNumber: this.pagination.PageNumber
      }
    ).subscribe(data => {
      console.log('Offshift data', data);
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
  getOffshitUploadPendingFromPagination(pageNo) {
    this.showLoader = true;
    this.requestList = [];
    this.pagination.PageSize = 10;
    this.pagination.PageNumber = pageNo;
    this.dutyRosterBase.postShiftsSAPUploadPending(
      {
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
            data.Result.forEach(elemt => {
              // tslint:disable-next-line:max-line-length
              const sapuploadsData = {
                EmployeeId: elemt.EmployeeId,
                AbsenceTypeId: elemt.AttendanceType,
                Start: '', // Time
                End: '',
                From: elemt.StartDate, // Date
                To: elemt.EndDate,
                ShiftId: elemt.Shift.Id,
                ShiftEmployee_Id: elemt.EmployeeId,
                WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
                UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
                Selected: false,
              };
              this.requestList.push(sapuploadsData);
            });
            // // ele.pageData = data.Result;
            // this.requestList = data.Result;
            console.log('getOffshitUploadPendingFromPagination', this.requestList);
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
  getOffshitUploadPendingFromPaginationPrv(currentPage) {
    if (this.localStorePagination.pageNoStart === currentPage) {
      console.log('Current Page is First Page');
    } else {
      this.getOffshitUploadPendingFromPagination(currentPage);
    }
  }


  // Pagination goto Previous Page - Last Page Check
  getOffshitUploadPendingFromPaginationNext(currentPage) {
    if (this.localStorePagination.pageNoEnd === currentPage) {
      console.log('Current Page is Last Page');
    } else {
      this.getOffshitUploadPendingFromPagination(currentPage);
    }
  }


  viewDetails() {
    console.log('viewDetails -> Clicked');
  }

  // Gernate Pagination Array and assign first Page Data from Server
  generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData) {
    console.log('generateAllPages', pageData);
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
        // tempPageData = pageData;
        pageData.forEach(elemt => {
          // tslint:disable-next-line:max-line-length
          const sapuploadsData = {
            EmployeeId: elemt.EmployeeId,
            AbsenceTypeId: elemt.AttendanceType,
            Start: '', // Time
            End: '',
            From: elemt.StartDate, // Date
            To: elemt.EndDate,
            ShiftId: elemt.Shift.Id,
            ShiftEmployee_Id: elemt.EmployeeId,
            WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
            UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
            Selected: false,
          };
          this.requestList.push(sapuploadsData);
        });
        tempPageData = this.requestList;
        // this.requestList = pageData;
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
