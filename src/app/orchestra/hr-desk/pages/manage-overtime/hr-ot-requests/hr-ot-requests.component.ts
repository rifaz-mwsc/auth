import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { HrOtRequestsBaseService } from '../../../shared/services/hr-ot-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-ot-requests',
  templateUrl: './hr-ot-requests.component.html',
  styleUrls: ['./hr-ot-requests.component.scss']
})
export class HrOtRequestsComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: '', page_title: 'overtime record' }
  // API Data
  showLoader: boolean;
  request: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  // Filter
  showFilters: boolean = true;
  isChecked: boolean = false;
  // Show Filter Loader
  showFilterLoader: boolean = false;
  // Filter
  employeeId: any = '';
  duration: any = '';
  sapUploadStatus: any = '';
  approvalStatus: any = '';
  division: any = '';
  department: any = '';
  section: any = '';
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
  overtimeFilter: any = [];
  overtimeList: any = [];
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private organisationBase: OrganizationBaseService,
    private hrOtRequestsBase: HrOtRequestsBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.sapUploadStatusList = [
      { Id: '', Name: '--', Label: '-- none --' },
      { Id: 1, Name: 'true', Label: 'Uploaded' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.sapUploadStatus = this.sapUploadStatusList[0].Name;


    this.supervisorApprovalStatusList = [
      { Id: '', Name: '--', Label: '-- none --' },
      { Id: 1, Name: 'true', Label: 'Approved' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.supervisorApprovalStatus = this.supervisorApprovalStatusList[0].Name;

    this.getDivisionList();

    this.getRequestForPageOneOnlyWithFilter(1);
  }

  ngOnInit() {
  }


  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.request = [];
    // getHRDeskOvertimeRequestsWithFilters(pageNo, pageSize, empoyeeId, Duration, sapUploadStatus, approvalStatus, division, department) {
    this.hrOtRequestsBase.getHRDeskOvertimeRequestsWithFilters(pageNo, this.defaultPaginationSize, this.employeeId, this.duration, this.sapUploadStatus, this.approvalStatus, this.divisionName, this.departmentName, this.sectionName).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);

      this.showLoader = true;
      for (let i = 0; i < data.items.length; i++) {
        data.items[i]['overtime_request_http_error_status'] = '';
        data.items[i]['overtime_request_http_error_message'] = '';
        data.items[i]['overtime_request_http_error_model_state'] = '';
        data.items[i]['overtime_request_checkbox_ui'] = false;
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
    this.hrOtRequestsBase.getHRDeskOvertimeRequestsWithFilters(pageNo, this.defaultPaginationSize, this.employeeId, this.duration, this.sapUploadStatus, this.approvalStatus, this.divisionName, this.departmentName, this.sectionName).subscribe((data: any) => {
      this.showLoader = true;
      for (let i = 0; i < data.items.length; i++) {
        data.items[i]['overtime_request_http_error_status'] = '';
        data.items[i]['overtime_request_http_error_message'] = '';
        data.items[i]['overtime_request_http_error_model_state'] = '';
        data.items[i]['overtime_request_checkbox_ui'] = false;
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


  hideViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
  }

  showViewCreateLeaveModal() {
    $('#ViewCreateLeaveModal').modal('show');
  }


  getDivisionList() {
    this.showFilterLoader = true;
    this.request = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
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
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.divisionId).subscribe((data: any) => {
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
    this.organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.departmentId).subscribe((data: any) => {
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
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
