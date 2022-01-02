import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { EmployeeBaseService } from './../../../services/employee-base.service';
import { HrEmployeeProfileBaseService } from './../../../services/hr-employee-profile-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-employee-profile-basic-info',
  templateUrl: './hr-employee-profile-basic-info.component.html',
})
export class HrEmployeeProfileBasicInfoComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  newUpdateData: any;
  // Create New - Loader
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Parent Component Data

  selectedRequest: any;
  selectedEmployeeId: any;

  @Input() profileBaiscInfo: any;
  @Input() showLoader: boolean;

  constructor(
    private toastr: ToastrService,
    private hrEmployeeProfileBase: HrEmployeeProfileBaseService) {
    // this.profileBaiscInfo =
    // {
    //   employee_city: "Male'",
    //   employee_department: "Information Systems",
    //   employee_designation: "Application Systems Analyst",
    //   employee_division: "ICT",
    //   employee_division_manager: null,
    //   employee_domain_id: "DU10031222",
    //   employee_email: "mohamed.suoodh@mwsc.com.mv",
    //   employee_ext_number: 5615,
    //   employee_id: "1222",
    //   employee_last_known_location: "Unknown",
    //   employee_mobile_number: 9999406,
    //   employee_name: "Mohamed Suoodh",
    //   employee_name_with_id: "Mohamed Suoodh (1222)",
    //   employee_office_location: "Fen Building 1st Floor",
    //   employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=DU10031222",
    //   employee_section: "ERP & Application Management",
    //   employee_status: "Active",
    //   employee_work_anniversary: "-",
    //   employee_manager: {
    //     employee_designation: "Assistant Manager, Information Systems",
    //     employee_domain_id: "du024347",
    //     employee_email: "ahmed.misru@mwsc.com.mv",
    //     employee_ext_number: 5613,
    //     employee_id: "347",
    //     employee_mobile_number: 7992677,
    //     employee_name: "Ahmed Misru",
    //     employee_name_with_id: "Ahmed Misru (347)",
    //     employee_picture_path: "https://staff-app-api-dev-01.mwsc.com.mv/v1/employee/picture?&domain_id=du024347",
    //   }
    // };
  }

  ngOnInit() {
  }


  showViewRecordDetailsModal(requestObj) {

  }




  hideViewUpdateExtentionModal() {
    $('#CardViewUpdateExtentionModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateExtentionModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateExtentionModal').modal('show');
  }





  hideViewUpdateMobileModal() {
    $('#CardViewUpdateMobileModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateMobileModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateMobileModal').modal('show');
  }


  hideViewUpdateDesignationModal() {
    $('#CardViewUpdateDesignationModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateDesignationModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateDesignationModal').modal('show');
  }



  hideViewUpdateDivisionModal() {
    $('#CardViewUpdateDivisionModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateDivisionModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateDivisionModal').modal('show');
  }



  hideViewUpdateDepartmentModal() {
    $('#CardViewUpdateDepartmentModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateDepartmentModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateDepartmentModal').modal('show');
  }




  hideViewUpdateSectionModal() {
    $('#CardViewUpdateSectionModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateSectionModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateSectionModal').modal('show');
  }




  hideViewUpdateCityModal() {
    $('#CardViewUpdateCityModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateCityModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateCityModal').modal('show');
  }




  hideViewUpdateLocationModal() {
    $('#CardViewUpdateLocationModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateLocationModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateLocationModal').modal('show');
  }



  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateExtention(selectedRequest) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: selectedRequest.employee_id,
        field_name: 'Extn',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateExtention data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_ext_number = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Extention Updated', 'Extention Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateExtention -> error', error);
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



   // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateMobile(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Mobile',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateMobile data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_mobile_number = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Mobile Updated', 'Mobile Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateMobile -> error', error);
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



  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateDesignation(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Designation',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateDesignation data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_designation = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Designation Updated', 'Designation Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateDesignation -> error', error);
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



  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateDivision(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Division',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateDivision data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_division = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Division Updated', 'Division Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateDivision -> error', error);
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




   // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateDepartment(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Department',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateDepartment data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_department = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Department Updated', 'Department Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateDepartment -> error', error);
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



  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateSection(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Section',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateSection data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_section = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Section Updated', 'Section Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateSection -> error', error);
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



  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateCity(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Region',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateCity data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_section = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('City/Region Updated', 'City/Region Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateCity -> error', error);
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





  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateLocation(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Location',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateLocation data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.profileBaiscInfo.employee_last_known_location = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Location Updated', 'Location Updated to '+ this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateLocation -> error', error);
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



  resetApiErrorModal(functionName) {
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> modelStateError - ', this.modelStateError);
    console.log(functionName, ' -> generalApiError - ', this.generalApiError);
  }
}
