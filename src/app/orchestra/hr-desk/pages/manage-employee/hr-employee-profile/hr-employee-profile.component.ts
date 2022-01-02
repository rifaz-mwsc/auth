import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../../../../../environments//environment';
import { LeaveRequestsBaseService } from './../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { EmployeeBaseService } from './../../../shared/services/employee-base.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile',
  templateUrl: './hr-employee-profile.component.html',
})
export class HrEmployeeProfileComponent implements OnInit {

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
  employeeId: any = '';
  division: any = '';
  department: any = '';
  employeeName: any = '';
  // DropDown
  divisionList: any = [];
  departmentList: any = [];


  searchValue: string;
  // Temp - to delete later
  // search: any;
  // duration: any;
  // employeeName: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private toastr: ToastrService,
    private employeeBase: EmployeeBaseService,
    private organisationBase: OrganizationBaseService) {

    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('requestList data', data);
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.divisionList = data.items;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });

    // this.division = this.divisionList[0].Name;

    this.departmentList = [
      { Id: '', Name: '', Label: '-- Select Department --' },
      { Id: 1, Name: 'Information Systems', Label: 'Information Systems' },
      { Id: 2, Name: 'Information Technology', Label: 'Information Technology' },
      { Id: 3, Name: 'Billing', Label: 'Billing' },
    ];
    this.department = this.departmentList[0].Name;


    this.requestList = [];
  }

  ngOnInit() {
  }


  // First Page Data from Server
  search(searchtext) {
    console.log('getRequestForPageOneOnly data');
    this.showLoader = true;
    this.requestList = [];
    let medicalLeaveId: any = "9001";
    this.employeeBase.getEmployeeSearch(this.searchValue).subscribe((data: any) => {
      console.log('requestList data', data);
      // Closing the alert - apiRequest Info
      setTimeout(() => {
        $('#apiRequest-info-alert').alert('close');
      }, 4000);
      this.requestList = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('getRequestForPageOneOnly -> error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  getRequestForPageOneOnlyWithFilter(pageNo) {
  }

  getRequestFromPagination(pageNo) {
  }

  getRequestFromPaginationPrv(pageNo) {
  }

  getRequestFromPaginationNext(pageNo) {
  }

  hideViewCreateModal(){

  }
  showViewCreateModal(){
    
  }

  checkValue(event: any) {
    console.log(event);
    if (event === 'showFilters') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
  }


}
