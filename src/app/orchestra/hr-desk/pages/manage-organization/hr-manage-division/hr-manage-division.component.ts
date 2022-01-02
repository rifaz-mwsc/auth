import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../../../../../environments//environment';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-manage-division',
  templateUrl: './hr-manage-division.component.html',
  styleUrls: ['./hr-manage-division.component.scss']
})
export class HrManageDivisionComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;
  // Filter
  showFilters: boolean = false;
  isChecked: boolean = false;
  // Filter
  searchText: any = '';
  // Model Loader
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Create New
  newDivisionName: any;     

  selectedDivisionId: any = [];
  selectedDivision: any = [];
  divisionList: any = [];
  selectedDepartmentId: any = [];
  selectedDepartment: any = [];
  departmentList: any = [];
  sectionList: any = [];

  @ViewChild('ViewCreateModal', { static: false }) ViewCreateModal: ElementRef;


  constructor(
    private toastr: ToastrService,
    private organisationBase: OrganizationBaseService) {
    this.getRequestList();
  }

  ngOnInit() {
  }

  getRequestList() {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('requestList data', data);
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.requestList = data.items;
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

  // Create Division
  postHRDeskCreateNew() {
    this.showModelLoader = true;
    this.organisationBase.postHRDeskAddDivision(
      {
        organization_division_name: this.newDivisionName,
      }
    ).subscribe(data => {
      console.log('postHRDeskAddDivision', data);
      this.toastr.success('New Division', 'New Division Created', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      this.refreshApiData('Create New');
    }, (error: Response | any) => {
      console.log('error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to access / view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }


  hideViewCreateModal() {
    $('#ViewCreateModal').modal('hide');
    this.refreshApiData('');
  }

  showViewCreateModal() {
    setTimeout(() => {
      $('#create-info-alert').alert('close');
    }, 4000);
    $('#ViewCreateModal').modal('show');
  }



  public refreshApiData(functionName) {
    this.showLoader = true;
    this.requestList = [];
    this.requestListWithPagination = [];
    console.log('refreshApiData -> Parent ', 'Overtime',);
    this.getRequestList();
  }
}
