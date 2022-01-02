import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from '../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { HrAllowanceRecordService } from './../../../shared/services/manage-allowance/hr-allowance-record.service';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-records',
  templateUrl: './hr-allowance-records.component.html',
  styleUrls: ['./hr-allowance-records.component.scss']
})
export class HrAllowanceRecordsComponent implements OnInit {

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
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Show Filter Loader
  showFilterLoader: boolean = false;
  // Filter
  searchText: any = '';
  employeeId: any = '';
  leaveType: any = '';
  division: any = '';
  department: any = '';
  section: any = '';
  selectedYear: any = '';
  selectedMonth: any = '';
  sapUploadStatus: any = '';
  supervisorApprovalStatus: any = '';
  // Filter - DropDown
  sapUploadStatusList: any = [];
  supervisorApprovalStatusList: any = [];
  leaveTypeList: any = [];
  divisionList: any = [];
  departmentList: any = [];
  sectionList: any = [];
  // Filter - DropDown - Disable Input
  divisionId: any = '';
  departmentId: any = '';
  sectionId: any = '';
  divisionName: any = '';
  departmentName: any = '';
  sectionName: any = '';
  disableDivision: boolean = true;
  disableDepartment: boolean = true;
  disableSection: boolean = true;
  // arrange Data for Bulk 
  leaveFilter: any = [];
  leaveList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private _toastr: ToastrService,
    private _organisationBase: OrganizationBaseService,
    private _hrLeaveRequestsBase: LeaveRequestsBaseService,
    private _hrAllowanceRecordBase: HrAllowanceRecordService) {

    this.getDivisionList();

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
    console.log('getRequestForPageOneOnlyWithFilter this.employeeId', this.employeeId);
    console.log('getRequestForPageOneOnlyWithFilter this.leaveType', this.leaveType);
    console.log('getRequestForPageOneOnlyWithFilter this.division', this.division);
    console.log('getRequestForPageOneOnlyWithFilter this.department', this.department);
    // getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, Duration, sapUploadStatus, approvalStatus,, department) {
    this._hrAllowanceRecordBase.getAllowanceRecordListWithFilters(pageNo, this.defaultPaginationSize, this.employeeId).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      if (data.total_pages > 0 && !this.requestListWithPagination.pageData) {
        const paginationTotalPages = data.total_pages;
        const paginationPageSize = this.defaultPaginationSize;
        const paginationTotalItemCount = data.total_count;
        this.leaveList = [];
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
    this._hrAllowanceRecordBase.getAllowanceRecordListWithFilters(pageNo, this.defaultPaginationSize, this.employeeId).subscribe((data: any) => {
      if (this.requestListWithPagination.length > 0) {
        this.showLoader = true;
        this.requestListWithPagination.forEach(ele => {
          this.showLoader = true;
          if (ele.pagination.pageNo === pageNo) {
            this.showLoader = true;
            this.localStorePagination.currentPage = ele.pagination.pageNo;
            this.localStorePagination.currentPageItemNoStart = ele.pagination.pageItemNoStart;
            this.localStorePagination.currentPageItemNoEnd = ele.pagination.pageItemNoEnd;
            this.leaveList = [];
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
    // console.log('generateAllPages', this.apiDataService);
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



  getDivisionList() {
    this.showFilterLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    this._organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('getDivisionList data', data);

      if (data.items.length > 0 && data.total_count > 0) {
        const defaultObj = {
          organization_division_created_by: '',
          organization_division_created_by_employee_details: '',
          organization_division_created_on: '',
          organization_division_created_on_friendly: '',
          organization_division_deleted_on: '',
          organization_division_deleted_on_friendly: '',
          organization_division_id: '',
          organization_division_name: '-- Select Division --',
          organization_division_label: '',
        };
        this.divisionList.push(defaultObj);
        data.items.forEach(ele => {
          const arryObj = {
            organization_division_created_by: ele.organization_division_created_by,
            organization_division_created_by_employee_details: ele.organization_division_created_by_employee_details,
            organization_division_created_on: ele.organization_division_created_on,
            organization_division_created_on_friendly: ele.organization_division_created_on_friendly,
            organization_division_deleted_on: ele.organization_division_deleted_on,
            organization_division_deleted_on_friendly: ele.organization_division_deleted_on_friendly,
            organization_division_id: ele.organization_division_id,
            organization_division_name: ele.organization_division_name,
            organization_division_label: ele.organization_division_name,
          };
          this.divisionList.push(arryObj);
        });
        this.division = this.divisionList[0];
        this.divisionId = this.divisionList[0].organization_division_id;
        this.divisionName = this.divisionList[0].organization_division_label;
        this.disableDivision = false;
      } else {
        this.disableDivision = true;
      }
      this.disableDepartment = true;
      this.disableSection = true;
      this.department = null;
      this.section = null;
      this.departmentList = null;
      this.sectionList = null;
      this.showFilterLoader = false;
    }, (error: Response | any) => {
      this.showFilterLoader = false;
      return throwError(new Error(error.status));
    });
  }

  divisionOnChange($event) {
    console.log('divisionOnChange ->              $event ->', $event);
    this.divisionList.forEach(ele => {
      if (ele.organization_division_id === $event) {
        this.divisionId = ele.organization_division_id;
        this.divisionName = ele.organization_division_label;
        console.log('divisionOnChange ->     this.division ', this.division);
        console.log('divisionOnChange ->   this.divisionId ', this.divisionId);
        console.log('divisionOnChange -> this.divisionName ', this.divisionName);
        this.getDepartmentsByDivisionId();
      }
    });
  }



  getDepartmentsByDivisionId() {
    this.showFilterLoader = true;
    this.departmentList = [];
    this._organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.divisionId).subscribe((data: any) => {
      console.log('getDepartmentsByDivisionId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        const defaultObj = {
          organization_department_can_delete: '',
          organization_department_created_by: '',
          organization_department_created_by_employee_details: '',
          organization_department_created_on: '',
          organization_department_created_on_friendly: '',
          organization_department_deleted_on: '',
          organization_department_deleted_on_friendly: '',
          organization_department_id: '',
          organization_department_is_deleted: '',
          organization_department_name: '-- Select Department --',
          organization_department_label: '',
          organization_division_id: '',
          organization_division_name: '',
        };
        this.departmentList.push(defaultObj);
        data.items.forEach(ele => {
          const arryObj = {
            organization_department_can_delete: ele.organization_department_can_delete,
            organization_department_created_by: ele.organization_department_created_by,
            organization_department_created_by_employee_details: ele.organization_department_created_by_employee_details,
            organization_department_created_on: ele.organization_department_created_on,
            organization_department_created_on_friendly: ele.organization_department_created_on_friendly,
            organization_department_deleted_on: ele.organization_department_deleted_on,
            organization_department_deleted_on_friendly: ele.organization_department_deleted_on_friendly,
            organization_department_id: ele.organization_department_id,
            organization_department_is_deleted: ele.organization_department_is_deleted,
            organization_department_name: ele.organization_department_name,
            organization_department_label: ele.organization_department_name,
            organization_division_id: ele.organization_division_id,
            organization_division_name: ele.organization_division_name,
          };
          this.departmentList.push(arryObj);
        });
        this.department = this.departmentList[0];
        this.departmentId = this.departmentList[0].organization_department_id;
        this.departmentName = this.departmentList[0].organization_department_label;
        this.disableDepartment = false;
      } else {
        this.disableDepartment = true;
      }
      this.disableSection = true;
      this.section = null;
      this.sectionList = null;
      this.showFilterLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showFilterLoader = false;
      return throwError(new Error(error.status));
    });
  }

  departmentOnChange($event) {
    // console.log('event', $event);
    // console.log('currentDepartmentList', this.department);
    // this.department = $event;
    // this.getSectionsByDepartmentId();

    console.log('departmentOnChange ->              $event ->', $event);
    this.departmentList.forEach(ele => {
      if (ele.organization_department_id === $event) {
        this.departmentId = ele.organization_department_id;
        this.departmentName = ele.organization_department_label;
        console.log('departmentOnChange ->     this.department ', this.department);
        console.log('departmentOnChange ->   this.departmentId ', this.departmentId);
        console.log('departmentOnChange -> this.departmentName ', this.departmentName);
        this.getSectionsByDepartmentId();
      }
    });
  }


  getSectionsByDepartmentId() {
    this.showFilterLoader = true;
    this.sectionList = [];
    this._organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.departmentId).subscribe((data: any) => {
      console.log('getSectionssByDepartmentId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        const defaultObj = {
          organization_department_id: '',
          organization_department_name: '',
          organization_scetion_deleted_on_friendly: '',
          organization_section_created_by: '',
          organization_section_created_by_employee_details: '',
          organization_section_created_on: '',
          organization_section_created_on_friendly: '',
          organization_section_deleted_on: '',
          organization_section_id: '',
          organization_section_name: '-- Select Section --',
          organization_section_label: '',
        };
        this.sectionList.push(defaultObj);
        data.items.forEach(ele => {
          const arryObj = {
            organization_department_id: ele.organization_department_id,
            organization_department_name: ele.organization_department_name,
            organization_scetion_deleted_on_friendly: ele.organization_scetion_deleted_on_friendly,
            organization_section_created_by: ele.organization_section_created_by,
            organization_section_created_by_employee_details: ele.organization_section_created_by_employee_details,
            organization_section_created_on: ele.organization_section_created_on,
            organization_section_created_on_friendly: ele.organization_section_created_on_friendly,
            organization_section_deleted_on: ele.organization_section_deleted_on,
            organization_section_id: ele.organization_section_id,
            organization_section_name: ele.organization_section_name,
            organization_section_label: ele.organization_section_name,
          };
          this.sectionList.push(arryObj);
        });
        this.section = this.sectionList[0];
        this.sectionId = this.sectionList[0].organization_section_id;
        this.sectionName = this.sectionList[0].organization_section_label;

        // this.sectionList = data.items;
        this.disableSection = false;
      } else {
        this.disableSection = true;
      }
      this.showFilterLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showFilterLoader = false;
      return throwError(new Error(error.status));
    });
  }

  sectionOnChange($event) {
    // console.log('event', $event);
    // console.log('currentSectionList', this.section);
    // this.section = $event;
    console.log('departmentOnChange ->              $event ->', $event);
    this.sectionList.forEach(ele => {
      if (ele.organization_section_id === $event) {
        this.sectionId = ele.organization_section_id;
        this.sectionName = ele.organization_section_label;
        console.log('departmentOnChange ->     this.department ', this.section);
        console.log('departmentOnChange ->   this.departmentId ', this.sectionId);
        console.log('departmentOnChange -> this.departmentName ', this.sectionName);
        // this.getSectionsByDepartmentId();
      }
    });
  }




  public refreshApiData() {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('refreshApiData -> Parent ', 'allowance-records',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
