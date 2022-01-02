import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../environments//environment';
// API Data Services
import { HrLettersBaseService } from './../../shared/services/letters/hr-letters-base.service';
// Core Services
import { PaginationService } from './../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-letters',
  templateUrl: './hr-letters.component.html',
})
export class HrLettersComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

  // Page Info
  pageInfo: any = { module_name: '', page_title: 'letters' }
  showLoader: boolean;
  request: any = { 'items': [], 'pagination': [], 'total_pages': 0 };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.letterRequests.defaultMaxPagination;
  // defaultPaginationSize: any = 5;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Filter
  employeeId: any = '';
  duration: any = '';
  // Upload
  fileList: File[] = [];
  newLetter: any = [];
  newLetterEmployeeId: any;
  newLetterTitle: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;


  @ViewChild('ViewCreateUploadLetterModal', { static: false }) ViewCreateUploadLetterModal: ElementRef;

  constructor(
    private hrLettersBase: HrLettersBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.getRequestForPageOneOnlyWithFilter(1);
  }

  ngOnInit() {
  }

  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.request = [];
    this.hrLettersBase.getHRDeskDocumentsWithFilters(pageNo, this.defaultPaginationSize, this.employeeId, this.duration).subscribe((data: any) => {
      console.log('request data', data);
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
    this.hrLettersBase.getHRDeskDocumentsWithFilters(pageNo, this.defaultPaginationSize, this.employeeId, this.duration).subscribe((data: any) => {
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


  hideViewCreateUploadLetterModal() {
    this.generalApiError = null;
    $('#ViewCreateUploadLetterModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
    this.refreshApiData();
  }

  showViewCreateUploadLetterModal() {
    $('#ViewCreateUploadLetterModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }

  hideViewBulkUploadLetterModal() {
    $('#ViewBulkUploadLetterModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
    this.refreshApiData();
  }

  showViewBulkUploadLetterModal() {
    $('#ViewBulkUploadLetterModal').modal('show');

  }

  addDocument(event) {
    let employeeId = '';
    console.log('employeeId', employeeId)
    this.fileList.push(...event.addedFiles);
    const formData = new FormData();
    // formData.append('DocumentType_Id', selectedDocumentType);
    // formData.append('Application_Id', this.selectedUtilityApplicationId);
    // formData.append('UploadedDocument', file);
    for (var i = 0; i < this.fileList.length; i++) {
      // formData.append('file[]', this.fileList[i]);
      formData.append('letter_uploaded_document', this.fileList[i]);
      employeeId = this.fileList[i].name.replace('.pdf', '');
      console.log('this.fileList -> employeeId', employeeId);

      this.hrLettersBase.postHRDeskUploadDocument(formData, employeeId, this.newLetterTitle).subscribe((res: any) => {
        console.log(res);
        this.fileList = [];
        this.toastr.success('Employee: ' + res.leave_request_employee_details, 'Documents Uploaded Successfully', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
        setTimeout(() => {
          this.hideViewCreateUploadLetterModal();
        }, this.modelCloseTimeOut_4);
      }, (error: Response | any) => {
        if (error) {
          this.coreErrorHandler.handleError(error).then((apiError: any) => {
            this.generalApiError = apiError.generalApiError;
            this.modelStateError = apiError.modelStateError;
          });
        }
        this.showLoader = false;
        this.fileList = [];
        setTimeout(() => {
          this.hideViewCreateUploadLetterModal();
        }, this.modelCloseTimeOut_4);
        return throwError(new Error(error.status));
      });
    }

    this.refreshApiData();
  }

  removeDocument(event) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }


  public refreshApiData() {
    this.showLoader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
