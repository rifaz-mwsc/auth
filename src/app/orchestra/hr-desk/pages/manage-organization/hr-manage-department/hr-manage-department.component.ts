import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../../../../../environments//environment';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-manage-department',
  templateUrl: './hr-manage-department.component.html',
  styleUrls: ['./hr-manage-department.component.scss']
})
export class HrManageDepartmentComponent implements OnInit {

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
  newDepartmentName: any;

  selectedDivisionId: any = [];
  selectedDivision: any = [];
  divisionList: any = [];
  selectedDepartmentId: any = [];
  selectedDepartment: any = [];
  departmentList: any = [];
  sectionList: any = [];

  @ViewChild('ViewCreateModal', { static: false }) ViewCreateModal: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private organisationBase: OrganizationBaseService) {
    this.selectedDivisionId = this.activatedRoute.snapshot.paramMap.get('id');

    this.organisationBase.getHRDeskDivisionByDivisionId(this.selectedDivisionId).subscribe((data:any) => {
      console.log('getHRDeskDivisionByDivisionId', data);
      this.selectedDivision = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });

    this.showLoader = true;
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.selectedDivisionId).subscribe((data:any) => {
      console.log('getHRDeskOrganizationListDepartmentsByDivisionId', data);
      this.requestList = data.items;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  ngOnInit() {
  }


  getDepartmentsByDivisionId() {
    this.showLoader = true;
    this.requestList = [];
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.selectedDivisionId).subscribe((data:any) => {
      console.log('getHRDeskOrganizationListDepartmentsByDivisionId', data);
      this.requestList = data.items;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
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


  // Create Department
  postHRDeskCreateNew() {
    this.showModelLoader = true;
    this.organisationBase.postHRDeskAddDepartment(
      {
        organization_division_id: this.selectedDivisionId,
        organization_Department_name: this.newDepartmentName,
      }
    ).subscribe(data => {
      console.log('postHRDeskAddDepartment', data);
      this.toastr.success('New Department', 'New Department Created', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
      this.refreshApiData('Create New');
    }, (error: Response | any) => {
      console.log('error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
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
    // console.log('generateAllPages', this.apiDataService);
    this.getDepartmentsByDivisionId();
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
    this.getDepartmentsByDivisionId();
  }
}
