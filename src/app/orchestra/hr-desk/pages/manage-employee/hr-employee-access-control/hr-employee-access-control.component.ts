import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../../../../../environments//environment';
import { LeaveRequestsBaseService } from './../../../shared/services/leave-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-access-control',
  templateUrl: './hr-employee-access-control.component.html',
})
export class HrEmployeeAccessControlComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  requestList: any;
  profileAccessControl: any;
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
  // DropDown
  divisionList: any = [];
  departmentList: any = [];

  searchValue: string;

  // Error Handling
  modelStateError: any;
  generalApiError: any;

  // Temp - to delete later
  search: any;
  employeeName: any;

  @ViewChild('ViewCreateLeaveModal', { static: false }) ViewCreateLeaveModal: ElementRef;

  constructor(
    private toastr: ToastrService,
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


    this.requestList = [
      {
        employee_city: "Male'",
        employee_department: "Information Systems",
        employee_designation: "Application Systems Analyst",
        employee_division: "ICT",
        employee_division_manager: null,
        employee_domain_id: "DU10031222",
        employee_email: "mohamed.suoodh@mwsc.com.mv",
        employee_ext_number: 5615,
        employee_id: "1222",
        employee_last_known_location: "Unknown",
        employee_mobile_number: 9999406,
        employee_name: "Mohamed Suoodh",
        employee_name_with_id: "Mohamed Suoodh (1222)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU10031222",
        employee_section: "ERP & Application Management",
        employee_status: "Active",
        employee_work_anniversary: "-",
        employee_manager: {
          employee_designation: "Assistant Manager, Information Systems",
          employee_domain_id: "du024347",
          employee_email: "ahmed.misru@mwsc.com.mv",
          employee_ext_number: 5613,
          employee_id: "347",
          employee_mobile_number: 7992677,
          employee_name: "Ahmed Misru",
          employee_name_with_id: "Ahmed Misru (347)",
          employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=du024347",
        }
      },
      {
        employee_city: "Male'",
        employee_department: "Information Systems",
        employee_designation: "Application Systems Analyst",
        employee_division: "ICT",
        employee_division_manager: null,
        employee_domain_id: "DU10031222",
        employee_email: "mohamed.suoodh@mwsc.com.mv",
        employee_ext_number: 5615,
        employee_id: "1222",
        employee_last_known_location: "Unknown",
        employee_mobile_number: 9999406,
        employee_name: "Mohamed Suoodh",
        employee_name_with_id: "Mohamed Suoodh (1222)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU10031222",
        employee_section: "ERP & Application Management",
        employee_status: "Active",
        employee_work_anniversary: "-",
        employee_manager: {
          employee_designation: "Assistant Manager, Information Systems",
          employee_domain_id: "du024347",
          employee_email: "ahmed.misru@mwsc.com.mv",
          employee_ext_number: 5613,
          employee_id: "347",
          employee_mobile_number: 7992677,
          employee_name: "Ahmed Misru",
          employee_name_with_id: "Ahmed Misru (347)",
          employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=du024347",
        }
      },
      {
        employee_city: "Male'",
        employee_department: "Information Systems",
        employee_designation: "Application Systems Analyst",
        employee_division: "ICT",
        employee_division_manager: null,
        employee_domain_id: "DU10031222",
        employee_email: "mohamed.suoodh@mwsc.com.mv",
        employee_ext_number: 5615,
        employee_id: "1222",
        employee_last_known_location: "Unknown",
        employee_mobile_number: 9999406,
        employee_name: "Mohamed Suoodh",
        employee_name_with_id: "Mohamed Suoodh (1222)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU10031222",
        employee_section: "ERP & Application Management",
        employee_status: "Active",
        employee_work_anniversary: "-",
        employee_manager: {
          employee_designation: "Assistant Manager, Information Systems",
          employee_domain_id: "du024347",
          employee_email: "ahmed.misru@mwsc.com.mv",
          employee_ext_number: 5613,
          employee_id: "347",
          employee_mobile_number: 7992677,
          employee_name: "Ahmed Misru",
          employee_name_with_id: "Ahmed Misru (347)",
          employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=du024347",
        }
      },
    ];
  }

  ngOnInit() {
  }


  // // First Page Data from Server
  // search(searchtext) {
  //   console.log('getRequestForPageOneOnly data');
  //   this.showLoader = true;
  //   this.requestList = [];
  //   let medicalLeaveId: any = "9001";
  //   this.mwscCommonEmployeeBase.getMwscCommonEmployeeSearch(this.searchValue).subscribe((data: any) => {
  //     console.log('requestList data', data);
  //     // Closing the alert - apiRequest Info
  //     setTimeout(() => {
  //       $('#apiRequest-info-alert').alert('close');
  //     }, 4000);
  //     this.requestList = data;
  //     this.showLoader = false;
  //   }, (error: Response | any) => {
  //     console.log('getRequestForPageOneOnly -> error', error);
  //     this.showLoader = false;
  //     return throwError(new Error(error.status));
  //   });
  // }

  getRequestForPageOneOnlyWithFilter(pageNo) {
  }

  getRequestFromPagination(pageNo) {
  }

  getRequestFromPaginationPrv(pageNo) {
  }

  getRequestFromPaginationNext(pageNo) {
  }

  hideViewCreateLeaveModal() {
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
