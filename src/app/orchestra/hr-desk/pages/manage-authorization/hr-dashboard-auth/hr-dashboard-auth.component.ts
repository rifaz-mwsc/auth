
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { environment } from './../../../../../../environments//environment';
// API Data Services
import { HrAuthorizationService } from './../../../shared/services/manage-authorization/hr-authorization.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { HrLettersBaseService } from './../../../shared/services/letters/hr-letters-base.service';
// Core Services
import { PaginationService } from './../../../../../core/services/pagination/pagination.service';
import { YodaCoreErrorHandlerService } from './../../../../../core/services/error-handler/yoda-core-error-handler.service';


@Component({
  selector: 'app-hr-dashboard-auth',
  templateUrl: './hr-dashboard-auth.component.html',
  styleUrls: ['./hr-dashboard-auth.component.scss']
})
export class HrDashboardAuthComponent implements OnInit {

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
  pageInfo: any = { module_name: 'dashboard authorization', page_title: 'manage dashboard authorization' }
  // API Data
  viewType: any = 'table';
  showLoader: boolean;
  request: any = { items: [], pagination: [], total_pages: 0 };
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.manageAuth.defaultMaxPagination;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Filter
  filter: any = { assignedEmployeeId: '', validDate: '', dashboardType: '' };
  assignedEmployeeId: any = '';
  validDate: any = '';
  validTo: any = '';
  // Create
  authOrganizationStrutureId: any = '';
  authOrganizationStrutureLevel: any = '';
  authDashboardTypeId: any = '';
  authAssignedEmployeeId: any = '';
  authAssignedDashboardStatusId: any = '';
  // DropDowns - OrganisationStructure
  disableDivision: boolean = false;
  disableDepartment: boolean = true;
  disableSection: boolean = true;
  selectedDivision: any;
  selectedDepartment: any;
  selectedSection: any;
  divisionList: any = [];
  departmentList: any = [];
  sectionList: any = [];
  // DropDowns
  authOrganizationStrutureLevelList: any = [];
  authDashboardTypeList: any = [];
  authAssignedDashboardStatusList: any = [];
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  createModelStateError: any;
  createGeneralApiError: any;
  // Error Handling
  modelStateError: any;
  generalApiError: any;


  @ViewChild('ViewCreateUploadLetterModal', { static: false }) ViewCreateUploadLetterModal: ElementRef;


  constructor(
    private hrLettersBase: HrLettersBaseService,
    private hrAuthorizationsBase: HrAuthorizationService,
    private organisationBase: OrganizationBaseService,
    private corePaginationService: PaginationService,
    private coreErrorHandler: YodaCoreErrorHandlerService,
    private toastr: ToastrService) {
    this.getRequestForPageOneOnlyWithFilter(1);
    this.getDivisionList();

    // this.authOrganizationStrutureLevelList = [
    //   { Id: 3, Name: 'Section', Label: 'Section', Status: false },
    //   { Id: 2, Name: 'Department', Label: 'Department', Status: false },
    //   { Id: 1, Name: 'Division', Label: 'Division', Status: false },
    // ];
    // this.authOrganizationStrutureLevelId = this.authOrganizationStrutureLevelList[0].Id;


    this.authDashboardTypeList = [
      { Id: 0, Name: 'Leave Dashboard', Label: 'Leave Dashboard' },
      { Id: 1, Name: 'Overtime Dashboard', Label: 'Overtime Dashboard' },
      { Id: 2, Name: 'Daily Attendance Dashboard', Label: 'Daily Attendance Dashboard' }
    ];
    this.authDashboardTypeId = this.authDashboardTypeList[0].Id;

    this.authAssignedDashboardStatusList = [
      { Id: 1, Name: false, Label: 'Do not set this Dashboard as Default' },
      { Id: 2, Name: true, Label: 'Set this Dashboard Default as Default' }
    ];
    this.authAssignedDashboardStatusId = this.authAssignedDashboardStatusList[0].Name;
  }


  pushDivisionToOrganizationStrutureLevel() {
    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);
    const status = { Id: 0, Name: 'Division', Label: 'Division', Status: true };
    this.authOrganizationStrutureLevelList = [];
    this.authOrganizationStrutureLevelList.push(status);
    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);

    this.authOrganizationStrutureLevel = 'Division';
  }


  pushDepartmentToOrganizationStrutureLevel() {
    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);
    const status = { Id: 1, Name: 'Department', Label: 'Department', Status: true };
    this.authOrganizationStrutureLevel = 'Department';

    // if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length > 1) {
    //   let indexS = this.authOrganizationStrutureLevelList.findIndex(d => d.Name === 'Section'); //find index in your array
    //   this.authOrganizationStrutureLevelList.splice(indexS, 1);//remove element from array

    // } else if

    if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length > 3) {
      let indexS = this.authOrganizationStrutureLevelList.findIndex(d => d.Name === 'Section'); //find index in your array
      this.authOrganizationStrutureLevelList.splice(indexS, 1);//remove element from array

    } else if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length > 2) {
      let index = this.authOrganizationStrutureLevelList.findIndex(d => d.Name === 'Department'); //find index in your array
      this.authOrganizationStrutureLevelList.splice(index, 1);//remove element from array

      let indexS = this.authOrganizationStrutureLevelList.findIndex(d => d.Name === 'Section'); //find index in your array
      this.authOrganizationStrutureLevelList.splice(indexS, 1);//remove element from array

    } else if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length === 2) {
      this.authOrganizationStrutureLevelList.push(status);
    } else {
      this.authOrganizationStrutureLevelList.push(status);
    }


    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);
  }


  pushSectionToOrganizationStrutureLevel() {
    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);
    const status = { Id: 2, Name: 'Section', Label: 'Section', Status: true };
    if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length > 3) {
      let index = this.authOrganizationStrutureLevelList.findIndex(d => d.Name === 'Section'); //find index in your array
      this.authOrganizationStrutureLevelList.splice(index, 1);//remove element from array
      this.authOrganizationStrutureLevel = 'Section';
    } else if (this.authOrganizationStrutureLevelList.length && this.authOrganizationStrutureLevelList.length === 3) {
    } else {
      this.authOrganizationStrutureLevelList.push(status);
      this.authOrganizationStrutureLevel = 'Section';
    }
    console.log('pushSectionToOrganizationStrutureLevel this.StrutureLevelList -> ', this.authOrganizationStrutureLevelList);
  }

  clearOrganisation() {
    this.authOrganizationStrutureLevel = null
    this.selectedDivision = null;
    this.selectedDepartment = null;
    this.selectedSection = null;
    this.disableDepartment = true;
    this.disableSection = true;
    this.departmentList = [];
    this.sectionList = [];
  }


  ngOnInit() {
  }


  getRequestForPageOneOnlyWithFilter(pageNo) {
    this.showLoader = true;
    this.request = [];
    this.hrAuthorizationsBase.getHRDeskAuthorizationsWithFilters(
      pageNo, this.defaultPaginationSize, this.filter.assignedEmployeeId, this.validDate, this.filter.dashboardType).subscribe((data: any) => {
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
    this.hrAuthorizationsBase.getHRDeskAuthorizationsWithFilters(
      pageNo, this.defaultPaginationSize, this.filter.assignedEmployeeId, this.validDate, this.filter.dashboardType).subscribe((data: any) => {
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



  hideViewAddModal() {
    this.generalApiError = null;
    $('#ViewAddModal').modal('hide');
    // console.log('generateAllPages', this.apiDataService);
    this.refreshApiData();
  }

  showViewAddModal() {
    $('#ViewAddModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }



  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
    // this.modelStateError = null;
    // this.generalApiError = null;
    // this.disableSaveButton = false;
  }


  getDivisionList() {
    this.showLoader = true;
    this.divisionList = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('getDivisionList', data.items);
      if (data.items.length > 0 && data.total_count > 0) {
        this.divisionList = data.items;
        this.disableDivision = false;
      } else {
        this.disableDivision = true;
      }
      this.disableDepartment = true;
      this.disableSection = true;
      this.selectedDepartment = null;
      this.selectedSection = null;
      this.departmentList = null;
      this.sectionList = null;
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

  divisionOnChange($event) {
    this.selectedSection = null;
    this.selectedDepartment = null;
    console.log('event', $event);
    console.log('selectedDivision', this.selectedDivision);
    this.selectedDivision = $event;
    // this.authOrganizationStrutureLevelList[2].Status = true;
    this.pushDivisionToOrganizationStrutureLevel();
    this.getDepartmentsByDivisionId();
  }


  getDepartmentsByDivisionId() {
    this.showLoader = true;
    this.departmentList = [];
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.selectedDivision).subscribe((data: any) => {
      console.log('getDepartmentsByDivisionId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.departmentList = data.items;
        this.disableDepartment = false;
      } else {
        this.disableDepartment = true;
      }
      this.disableSection = true;
      this.selectedSection = null;
      this.sectionList = null;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  departmentOnChange($event) {
    this.selectedSection = null;
    console.log('event', $event);
    console.log('selectedDepartment', this.selectedDepartment);
    this.selectedDepartment = $event;
    // this.authOrganizationStrutureLevelList[1].Status = true;
    this.pushDepartmentToOrganizationStrutureLevel();
    this.getSectionsByDepartmentId();
  }


  getSectionsByDepartmentId() {
    this.showLoader = true;
    this.sectionList = [];
    this.organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.selectedDepartment).subscribe((data: any) => {
      console.log('getSectionssByDepartmentId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.sectionList = data.items;
        this.disableSection = false;
      } else {
        this.disableSection = true;
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  sectionOnChange($event) {
    console.log('event', $event);
    console.log('sectionOnChange', this.selectedSection);
    // this.authOrganizationStrutureLevelList[0].Status = true;
    this.pushSectionToOrganizationStrutureLevel();
    this.selectedSection = $event;
  }




  postHRDeskCreateDashboardAuth() {
    let merged: any = [];
    this.showModelLoader = true;
    this.generalApiError = null;
    this.createModelStateError = null;
    console.log('authOrganizationStrutureLevel', this.authOrganizationStrutureLevel);
    console.log('selectedDivision', this.selectedDivision);
    console.log('selectedDepartment', this.selectedDepartment);
    console.log('selectedSection', this.selectedSection);



    if (this.authOrganizationStrutureLevel === 'Division') {
      this.authOrganizationStrutureId = this.selectedDivision;
    } else if (this.authOrganizationStrutureLevel === 'Department') {
      this.authOrganizationStrutureId = this.selectedDepartment;
    } else if (this.authOrganizationStrutureLevel === 'Section') {
      this.authOrganizationStrutureId = this.selectedSection;
    }

    // console.log('postHRDeskCreateDashboardAuth ->      authOrganizationStrutureId :: ', this.authOrganizationStrutureId);
    // console.log('postHRDeskCreateDashboardAuth ->   authOrganizationStrutureLevel :: ', this.authOrganizationStrutureLevel);
    // console.log('postHRDeskCreateDashboardAuth ->             authDashboardTypeId :: ', this.authDashboardTypeId);
    // console.log('postHRDeskCreateDashboardAuth ->          authAssignedEmployeeId :: ', this.authAssignedEmployeeId);

    this.hrAuthorizationsBase.postHRDeskCreateAuthorization(
      {
        organization_structure_id: this.authOrganizationStrutureId,
        organization_structure_level: this.authOrganizationStrutureLevel,
        dashboard_type: this.authDashboardTypeId,
        assigned_to: this.authAssignedEmployeeId,
        // is_default: this.authAssignedDashboardStatusId,
      }
    ).subscribe(data => {
      console.log('updateContactInformation', data);
      this.toastr.success('New Dashboard Authorization', 'New Dashboard Authorization Created', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.authOrganizationStrutureId = null;
      this.authOrganizationStrutureLevel = null;
      this.authDashboardTypeId = null;
      this.authAssignedEmployeeId = null;
      this.authAssignedDashboardStatusId = null;
      this.showModelLoader = false;
      this.hideViewAddModal();
    }, (error: Response | any) => {
      if (error) {
        this.coreErrorHandler.handleError(error).then((apiError: any) => {
          this.createGeneralApiError = apiError.generalApiError;
          this.createModelStateError = apiError.modelStateError;
        });
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }

  setAsDefault(obj) {

  }

  public refreshApiData() {
    this.showLoader = true;
    this.request = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestForPageOneOnlyWithFilter(1);
  }
}
