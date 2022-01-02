import { Component, OnInit, ViewChild } from '@angular/core';
import { HrMangeEmployeeBaseService } from '../../../shared/services/hr-mange-employee-base.service';
import { HrEmployeeStatisticsBaseService } from '../../../shared/services/manage-employee/hr-employee-statistics-base.service';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
// import 'fullcalendar';
declare var $: any;

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-hr-statistics',
  templateUrl: './hr-statistics.component.html',
  styleUrls: ['./hr-statistics.component.scss']
})
export class HrStatisticsComponent implements OnInit {

  // Show Components
  modules: any = environment.appConfig.hrDesk.statistics.modules;

  showLoader: boolean = false;
  requestList: any;

  employeeId: any;
  // Pagination Data
  defaultPaginationSize: any = environment.appConfig.hrDesk.leaveRequests.defaultMaxPagination;
  requestListWithPagination: any = [];
  localStorePagination: any = [];
  currentPage: number;

  employeeStatistics: any;
  // Dropdown List
  yearList: any = [];
  selectedYear: number = 2021;
  selectedYearObj: any = [];
  // Overtime Calculator
  otCalcFrom: any;
  otCalcTo: any;
  otCalcDetails: any;
  // Overtime Calculator - Error
  otCalcGeneralApiError: any;
  otCalcModelStateError: any;
  showOtCalcLoader: boolean = false;
  // Leave Detail Model
  selectedAbsenceTypeName: any;
  selectedAbsenceTypeId: any;
  selectedAbsenceTypeDetail: any;
  // selected Employee
  selectedEmployeeId: any;
  selectedEmployee: any;
  subordinateAvatorFilters: any = [];


  // Error Handling
  modelStateError: any;
  generalApiError: any;


  constructor(private hrEmployeeStatisticsBase: HrEmployeeStatisticsBaseService) {
    this.yearChange(this.selectedYear);
  }

  ngOnInit() {
  }


  yearOnChange(drop_down_selected_year) {
    console.log('yearOnChange -> drop_down_selected_year :: ', drop_down_selected_year);
    console.log('selectedYear', this.selectedYear);

    this.yearList.forEach(yearListItem => {

      if (drop_down_selected_year.toString() === yearListItem.Year.toString()) {
        this.selectedYearObj = yearListItem;
        console.log('yearOnChange -> yearEle :: ', yearListItem);
        console.log('yearOnChange -> selectedYearObj :: ', this.selectedYearObj);

        let convertyear = moment(yearListItem.Year).format('YYYY');
        this.selectedYear = yearListItem.Year;
        this.getEmployeeStatistics();
      }
      else {
        console.log('yearOnChange -> else :: ', drop_down_selected_year.toString());
        console.log('yearOnChange -> else :: ', yearListItem.Year.toString());
      }
    });

    console.log('selectedYear', this.selectedYear);
  }


  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    // this.search(this.employeeId);
  }


  getEmployeeStatistics() {
    this.modelStateError = null;
    this.employeeStatistics = [];
    console.log('employeeStatistics this.selectedEmployeeId        -> ', this.selectedEmployeeId);
    console.log('employeeStatistics this.selectedYearObj.YearStart -> ', this.selectedYearObj.YearStart);
    console.log('employeeStatistics this.selectedYearObj.YearEnd   -> ', this.selectedYearObj.YearEnd);
    // this.selectedYearObj.YearStart = '01 Jan 2021';
    // this.selectedYearObj.YearEnd = '30 Dec 2021';

    this.hrEmployeeStatisticsBase.getStatistics(this.selectedEmployeeId, this.selectedYearObj.YearStart, this.selectedYearObj.YearEnd).subscribe((data: any) => {
      this.employeeStatistics = data;
      console.log('employeeStatistics data', this.employeeStatistics);
      this.showLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
        console.log('error 403', error);
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
        console.log('error 500', error);
      } else {
        console.log('error other', error);
        this.generalApiError = error.error.error_message;
      }
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }



  calculateOvertime() {

    console.log('calculateOvertime this.selectedEmployeeId -> ', this.selectedEmployeeId);
    console.log('calculateOvertime this.otCalcFrom         -> ', this.otCalcFrom);
    console.log('calculateOvertime this.otCalcTo           -> ', this.otCalcTo);

    this.hrEmployeeStatisticsBase.getOvertimeCalculation(this.selectedEmployeeId, this.otCalcFrom, this.otCalcTo).subscribe((data: any) => {
      console.log('calculateOvertime data', data);
      this.otCalcDetails = data;
      this.showOtCalcLoader = false;
    }, (error: Response | any) => {
      console.log('calculateOvertime -> error', error);
      if (error.status === 400) {
        this.otCalcGeneralApiError = error.error.error_message;
        this.otCalcModelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.otCalcGeneralApiError = 'Authorization Error! You are not authorized to view this content';
        console.log('error 403', error);
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.otCalcGeneralApiError = 'Oh Snap! Unknown Error Occurred';
        console.log('error 500', error);
      } else {
        console.log('error other', error);
        this.otCalcGeneralApiError = error.error.error_message;
      }
      this.showOtCalcLoader = false;
      return throwError(new Error(error.status));
    });
  }



  getAbsenseTypeDeatilsForYear() {
    // this.supvPortalStatistics.getStaffPortalStatisticsAbsenseDeatilsForYear(this.selectedEmployeeId, this.selectedYear, this.selectedAbsenceTypeId).subscribe((data: any) => {
    //   console.log('getAbsenseTypeDeatilsForYear data', data);
    //   this.selectedAbsenceTypeDetail = data;
    //   this.showLoader = false;
    //   this.showViewSubordinateLeaveDetailsModal();
    // }, (error: Response | any) => {
    //   console.log('getAbsenseTypeDeatilsForYear -> error', error);
    //   this.showLoader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  hideViewSelfCertificationLeaveModal() {
    $('#ViewSelfCertificationLeaveModal').modal('hide');
  }


  showViewSelfCertificationLeaveModal() {
    $('#ViewSelfCertificationLeaveModal').modal('show');
  }


  hideViewLeaveDetailsModal() {
    $('#ViewLeaveDetailsModal').modal('hide');
  }


  showViewLeaveDetailsModal() {
    $('#ViewLeaveDetailsModal').modal('show');
  }


  showViewLeaveDetails(leave) {
    this.selectedAbsenceTypeName = leave.absence_type_name;
    this.selectedAbsenceTypeId = leave.absence_type_sap_id;
    // this.getAbsenseTypeDeatilsForYear();
  }


  yearChange(newValue) {
    if (newValue > 2018 && newValue < 2050) {
      this.getYearStartAndEnd(newValue);
    }
  }


  getYearStartAndEnd(year) {
    if (year > 2018 && year < 2050) {
      let yearObj;
      yearObj = Number(year);
      let yearStartDate = moment(yearObj, 'YYYY').startOf('year').format('DD MMM YYYY');
      let yearEndDate = moment(yearObj, 'YYYY').endOf('year').format('DD MMM YYYY');

      console.log('getYears ->  this.yearStartDate ', yearStartDate);
      console.log('getYears ->  this.yearEndDate ', yearEndDate);

      this.selectedYearObj.YearStart = yearStartDate;
      this.selectedYearObj.YearEnd = yearEndDate;
    }
  }


  getYears() {
    this.yearList = [];
    let yearList;
    let yearObj;
    let yearFilter;

    let yearStartDate;
    let yearEndDate;


    let minYearDate;
    let loopYearDate;
    let minYear;
    let maxYear;

    minYearDate = moment('01/01/2019', 'DD/MM/YYYY').format('DD/MM/YYYY');
    minYear = moment('01/01/2019', 'DD/MM/YYYY').format('YYYY');
    maxYear = moment().format('YYYY');

    let i = 0;
    const max = maxYear - minYear + 2;

    console.log('getYears -> minYear ', minYear);
    console.log('getYears -> maxYear ', maxYear);
    console.log('getYears -> max ', max);
    for (i = 0; i < max; i++) {
      // yearList = moment().add(i, 'years').format('YYYY');
      yearList = Number(minYear); // Convert String to Number
      yearObj = yearList + i;

      let daysToAdd = i * 367;
      loopYearDate = moment(minYearDate).add(daysToAdd, 'days').format('DD/MM/YYYY');

      let yearStartDate = moment(loopYearDate, 'DD/MM/YYYY').startOf('year').format('DD MMM YYYY');
      let yearEndDate = moment(loopYearDate, 'DD/MM/YYYY').endOf('year').format('DD MMM YYYY');

      yearFilter = { Id: i, Year: yearObj, YearStart: yearStartDate, YearEnd: yearEndDate };
      this.yearList.push(yearFilter);

      console.log('getYears ->  daysToAdd ', daysToAdd);
      console.log('getYears ->  daysToAdd ', yearStartDate);
      console.log('getYears ->  daysToAdd ', yearEndDate);

      console.log('getYears ->  this.yearList ', this.yearList);
    }

    this.selectedYearObj = this.yearList[0];

    let convertyear = moment(this.selectedYearObj.Year).format('YYYY');
    // this.selectedYear = convertyear;
  }

}
