import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HrOtRequestsBaseService } from './../../../shared/services/hr-ot-requests-base.service';
import { OrganizationBaseService } from './../../../shared/services/organization/organization-base.service';
import { environment } from './../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-manage-organization-structure',
  templateUrl: './hr-manage-organization-structure.component.html',
  styleUrls: ['./hr-manage-organization-structure.component.scss']
})
export class HrManageOrganizationStructureComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  showLoader: boolean;
  requestList: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.overtimeRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;

  // Error Handling
  modelStateError: any;
  generalApiError: any;

  currentDivisionList: any = [];
  currentDepartmentList: any = [];
  currentSectionList: any = [];
  currentDivision: any;
  currentDepartment: any;
  currentSection: any;
  currentEmployeeList: any = [];
  disableCurrentDivision: boolean = false;
  disableCurrentDepartment: boolean = true;
  disableCurrentSection: boolean = true;

  disableCurrentEmployeeSearchButton: boolean = true;
  showCurrentEmployeeSearchLoader: boolean = false;

  newDivisionList: any = [];
  newDepartmentList: any = [];
  newSectionList: any = [];
  newDivision: any;
  newDepartment: any;
  newSection: any;
  newEmployeeList: any = [];
  disableNewDivision: boolean = false;
  disableNewDepartment: boolean = true;
  disableNewSection: boolean = true;

  disableNewEmployeeSearchButton: boolean = true;
  showNewEmployeeSearchLoader: boolean = false;

  // Temp - to delete later
  selectedRequest: any;

  constructor(
    private toastr: ToastrService,
    private organisationBase: OrganizationBaseService) {
    this.getCurrentDivisionList();
    this.getNewDivisionList();
  }

  ngOnInit() {
  }





  getCurrentDivisionList() {
    this.showLoader = true;
    this.currentDivisionList = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('getCurrentDivisionList', data.items);
      if (data.items.length > 0 && data.total_count > 0) {
        this.currentDivisionList = data.items;
        this.disableCurrentDivision = false;
      } else {
        this.disableCurrentDivision = true;
      }
      this.disableCurrentDepartment = true;
      this.disableCurrentSection = true;
      this.currentDepartment = null;
      this.currentSection = null;
      this.currentDepartmentList = null;
      this.currentSectionList = null;
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

  divisionOnChange($event) {
    console.log('event', $event);
    console.log('selectedDivision', this.currentDivision);
    this.currentDivision = $event;
    this.getDepartmentsByDivisionId();
  }







  getDepartmentsByDivisionId() {
    this.showLoader = true;
    this.currentDepartmentList = [];
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.currentDivision).subscribe((data: any) => {
      console.log('getDepartmentsByDivisionId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.currentDepartmentList = data.items;
        this.disableCurrentDepartment = false;
      } else {
        this.disableCurrentDepartment = true;
      }
      this.disableCurrentSection = true;
      this.currentSection = null;
      this.currentSectionList = null;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  departmentOnChange($event) {
    console.log('event', $event);
    console.log('currentDepartmentList', this.currentDepartment);
    this.currentDepartment = $event;
    this.getSectionsByDepartmentId();
  }






  getSectionsByDepartmentId() {
    this.showLoader = true;
    this.currentSectionList = [];
    this.organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.currentDepartment).subscribe((data: any) => {
      console.log('getSectionssByDepartmentId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.currentSectionList = data.items;
        this.disableCurrentSection = false;
      } else {
        this.disableCurrentSection = true;
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
    console.log('currentSectionList', this.currentSection);
    this.currentSection = $event;
  }


  getCurrentEmployeeList() {
    this.currentEmployeeList = [
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
        employee_name_with_id: "Ali Rifaz (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Rifaz Waheed (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Rifaz Junior (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Ayya Rifaz (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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













  getNewDivisionList() {
    this.showLoader = true;
    this.newDivisionList = [];
    this.organisationBase.getHRDeskOrganizationDivisionList().subscribe((data: any) => {
      console.log('getNewDivisionList', data.items);
      if (data.items.length > 0 && data.total_count > 0) {
        this.newDivisionList = data.items;
        this.disableNewDivision = false;
      } else {
        this.disableNewDivision = true;
      }
      this.disableNewDepartment = true;
      this.disableNewSection = true;
      this.newDepartmentList = null;
      this.newSectionList = null;
      this.newDepartment = null;
      this.newSection = null;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  newDivisionOnChange($event) {
    console.log('event', $event);
    console.log('newDivisionOnChange', this.newDivision);
    this.newDivision = $event;
    this.getNewDepartmentsByDivisionId();
  }

  getNewDepartmentsByDivisionId() {
    this.showLoader = true;
    this.newDepartmentList = [];
    this.organisationBase.getHRDeskOrganizationListDepartmentsByDivisionId(this.newDivision).subscribe((data: any) => {
      console.log('getNewDepartmentsByDivisionId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.newDepartmentList = data.items;
        this.disableNewDepartment = false;
      } else {
        this.disableNewDepartment = true;
      }
      this.disableNewSection = true;
      this.newSection = null;
      this.newSectionList = null;
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }


  newDepartmentOnChange($event) {
    console.log('event', $event);
    console.log('newDepartmentOnChange', this.newDepartment);
    this.newDepartment = $event;
    this.getNewSectionsByDepartmentId();
    this.disableNewSection = false;
  }


  getNewSectionsByDepartmentId() {
    this.showLoader = true;
    this.newSectionList = [];
    this.organisationBase.getHRDeskOrganizationListSectionsByDepartmentId(this.newDepartment).subscribe((data: any) => {
      console.log('getNewSectionsByDepartmentId', data);
      if (data.items.length > 0 && data.total_count > 0) {
        this.newSectionList = data.items;
        this.disableNewSection = false;
      } else {
        this.disableNewSection = true;
      }
      this.showLoader = false;
    }, (error: Response | any) => {
      console.log('error', error);
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  newSectionOnChange($event) {
    console.log('event', $event);
    console.log('newSectionList', this.newSection);
    this.newSection = $event;
  }


  getNewEmployeeList() {
    this.newEmployeeList = [
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
        employee_name_with_id: "Ali Rifaz Waheed (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Ali Rifaz Waheed (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Ali Rifaz Waheed (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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
        employee_name_with_id: "Ali Rifaz Waheed (1381)",
        employee_office_location: "Fen Building 1st Floor",
        employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU12721381",
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



  moveToNewOrganizationStructure(employee) {
    console.log('moveToNewOrganizationStructure -> employee', employee);
  }
}
