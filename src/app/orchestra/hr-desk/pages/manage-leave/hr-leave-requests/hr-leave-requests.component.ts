import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { LeaveRequestsBaseService } from '../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-leave-requests',
  templateUrl: './hr-leave-requests.component.html',
  styleUrls: ['./hr-leave-requests.component.scss']
})
export class HrLeaveRequestsComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Page Info
  pageInfo: any = { module_name: 'leave', page_title: 'leave requests' }
  // API Data
  request: any = { items: [], pagination: [], total_pages: 0 };
  // API Data - UI Realted
  // loaderSize: any = 'xl';
  // showLoader: boolean = true;
  // viewType: any = 'leave-requets';
  requestUi: any = { viewType: 'leave-requets', show_loader: true, loader_size: 'xl' };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  // UI -
  // Filter
  filter: any = {
    showFilters: true, show_filters: false, show_filter_loader: false, 'default_page_size': null,
    leave_type: null, leave_type_list: [],
    employee_id: '', year: '', month: '',
    division: '', division_info: '', division_list: [], disable_division: false,
    department: '', department_info: '', department_list: [], disable_department: true,
    section: '', section_info: '', section_list: [], disable_section: true,
    sap_pending_status: null, sap_pending_status_list: [],
    supervisor_approval_status: null, supervisor_approval_status_list: []
  };
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private organisationBase: OrganizationBaseService,
    private hrLeaveRequestsBase: LeaveRequestsBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.filter.sap_pending_status_list = [
      { Id: '', Name: '--', Label: '-- none --' },
      { Id: 1, Name: 'true', Label: 'Uploaded' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.filter.sap_pending_status = this.filter.sap_pending_status_list[0].Name;


    this.filter.supervisor_approval_status_list = [
      { Id: '', Name: '--', Label: '-- none --' },
      { Id: 1, Name: 'true', Label: 'Approved' },
      { Id: 2, Name: 'false', Label: 'Pending' },
    ];
    this.filter.supervisor_approval_status = this.filter.supervisor_approval_status_list[0].Name;


    this.filter.leave_type_list = [
      { Id: '', Name: '-- Leave Type --' },
      { Id: 9000, Name: 'Annual' },
      { Id: 9001, Name: 'Medical' },
      { Id: 9004, Name: 'Compassionate' },
      { Id: 9002, Name: 'Maternity' },
      { Id: 9003, Name: 'Paternity' },
      { Id: 9005, Name: 'Circumcision' },
    ];
    this.filter.leave_type = this.filter.leave_type_list[0].Id;

    this.getDivisionList();

    this.getRequestForPageOneOnlyWithFilter(1);
  }

  ngOnInit() {
  }

  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.requestUi.show_loader = true;
    this.request = [];
    console.log(this.pageInfo.page_title + 'getRequestForPageOne -> pageNo ::', pageNo);
    console.log('getRequestForPageOneOnlyWithFilter defaultPaginationSize', this.defaultPaginationSize);

    this.hrLeaveRequestsBase.getHRDeskLeaveRequestsWithFilters(pageNo, this.defaultPaginationSize, this.filter.employee_id, this.filter.leave_type, this.filter.division, this.filter.department, this.filter.section).subscribe((data: any) => {
      console.log(this.pageInfo.page_title + ' -> data ::', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.requestUi.show_loader = true;

      for (let i = 0; i < data.items.length; i++) {
        data.items[i]['leave_request_http_error_status'] = '';
        data.items[i]['leave_request_http_error_message'] = '';
        data.items[i]['leave_request_http_error_model_state'] = '';
        data.items[i]['leave_request_checkbox_ui'] = false;
      }
      if (data.total_pages > 0) {
        this.corePaginationService.generateAllPages(this.defaultPaginationSize, data).then((listPagination: any) => {
          this.request.items = listPagination.items;
          this.request.pagination = listPagination;
          this.request.total_pages = listPagination.total_pages;
        });
      }

      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
      if (error) {
        this.coreErrorHandler.handleError(error).then((apiError: any) => {
          this.generalApiError = apiError.generalApiError;
          this.modelStateError = apiError.modelStateError;
        });
      }
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }

  // Page Data by PageNo from Server
  getRequestFromPagination(pageNo) {
    this.requestUi.show_loader = true;
    this.request = [];
    this.hrLeaveRequestsBase.getHRDeskLeaveRequestsWithFilters(pageNo, this.defaultPaginationSize, this.filter.employee_id, this.filter.leave_type, this.filter.division, this.filter.department, this.filter.section).subscribe((data: any) => {
      this.requestUi.show_loader = true;

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
      this.requestUi.show_loader = false;
    }, (error: Response | any) => {
      if (error) {
        this.coreErrorHandler.handleError(error).then((apiError: any) => {
          this.generalApiError = apiError.generalApiError;
          this.modelStateError = apiError.modelStateError;
        });
      }
      this.requestUi.show_loader = false;
      return throwError(new Error(error.status));
    });
  }

  // Pagination goto Previous Page - First Page Check
  getRequestFromPaginationPrv(currentPage) {
    console.log(this.pageInfo.page_title +'getRequestFromPaginationPrv', currentPage);
    if (currentPage === 1) {
      console.log('Current Page is First Page');
    } else {
      this.getRequestFromPagination(currentPage - 1);
    }
  }


  // Pagination goto Next Page - Last Page Check
  getRequestFromPaginationNext(currentPage) {
    console.log(this.pageInfo.page_title +'getRequestFromPaginationNext', currentPage);
    if (currentPage === this.request.pagination.total_pages) {
      console.log('Current Page is Last Page');
    } else {
      this.getRequestFromPagination(currentPage + 1);
    }
  }


  // Pagination goto First Page - First Page Check
  getRequestFromPaginationFirst(currentPage) {
    console.log(this.pageInfo.page_title +'getRequestFromPaginationFirst', currentPage);
    if (currentPage === 1) {
      this.getRequestFromPagination(currentPage);
    }
  }


  // Pagination goto Last Page - Last Page Check
  getRequestFromPaginationLast(currentPage) {
    console.log(this.pageInfo.page_title +'getRequestFromPaginationLast', currentPage);
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
    this.filter.show_filter_loader = true;
    this.request = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log(this.pageInfo.page_title +'getDivisionList data', data);

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
        this.filter.division_list.push(defaultObj);
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
          this.filter.division_list.push(arryObj);
        });
        this.filter.division_info = this.filter.division_list[0];
        this.filter.division = this.filter.division_list[0].organization_division_label;
        this.filter.disable_division = false;
      } else {
        this.filter.disable_division = true;
      }
      this.filter.disable_department = true;
      this.filter.disable_section = true;
      this.filter.department = null;
      this.filter.section = null;
      this.filter.department_list = [];
      this.filter.section_list = [];
      this.filter.show_filter_loader = false;
    }, (error: Response | any) => {
      this.filter.show_filter_loader = false;
      return throwError(new Error(error.status));
    });
  }

  divisionOnChange($event) {
    console.log('divisionOnChange ->              $event ->', $event);
    this.filter.division_list.forEach(ele => {
      if (ele.organization_division_id === $event) {
        this.filter.division_info = ele;
        this.filter.division = ele.organization_division_id;
        console.log('divisionOnChange ->        this.filter.division ', this.filter.division);
        console.log('divisionOnChange ->   this.filter.division_info ', this.filter.division_info);
        this.getDepartmentsByDivisionId();
      }
    });
  }



  getDepartmentsByDivisionId() {
    this.filter.show_filter_loader = true;
    this.filter.department_list = [];
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.filter.division_info.organization_division_id).subscribe((data: any) => {
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
        this.filter.department_list.push(defaultObj);
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
          this.filter.department_list.push(arryObj);
        });
        this.filter.department_info = this.filter.department_list[0];
        this.filter.department = this.filter.department_list[0].organization_department_label;
        this.filter.disable_department = false;
      } else {
        this.filter.disable_department = true;
      }
      this.filter.disable_section = true;
      this.filter.section = null;
      this.filter.section_list = [];
      this.filter.show_filter_loader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.filter.show_filter_loader = false;
      return throwError(new Error(error.status));
    });
  }


  departmentOnChange($event) {
    console.log('departmentOnChange ->              $event ->', $event);
    this.filter.department_list.forEach(ele => {
      if (ele.organization_department_id === $event) {
        this.filter.department_info = ele;
        this.filter.department = ele.organization_department_id;
        console.log('departmentOnChange ->  this.filter.department_info ', this.filter.department_info);
        console.log('departmentOnChange ->       this.filter.department ', this.filter.department);
        this.getSectionsByDepartmentId();
      }
    });
  }


  getSectionsByDepartmentId() {
    this.filter.show_filter_loader = true;
    this.filter.section_list = [];
    this.organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.filter.department_info.organization_department_id).subscribe((data: any) => {
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
        this.filter.section_list.push(defaultObj);
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
          this.filter.section_list.push(arryObj);
        });
        this.filter.section_info = this.filter.section_list[0];
        this.filter.section = this.filter.section_list[0].organization_section_label;
        // this.filter.section_list = data.items;
        this.filter.disable_section = false;
      } else {
        this.filter.disable_section = true;
      }
      this.filter.show_filter_loader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.filter.show_filter_loader = false;
      return throwError(new Error(error.status));
    });
  }

  sectionOnChange($event) {
    // console.log('event', $event);
    // console.log('currentSectionList', this.section);
    // this.section = $event;
    console.log('departmentOnChange ->              $event ->', $event);
    this.filter.section_list.forEach(ele => {
      if (ele.organization_section_id === $event) {
        this.filter.section_info = ele;
        this.filter.section = ele.organization_section_id;
        console.log('departmentOnChange ->   this.filter.section_info ', this.filter.section_info);
        console.log('departmentOnChange ->   this.filter.section ', this.filter.section);
      }
    });
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
    this.requestUi.show_loader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
