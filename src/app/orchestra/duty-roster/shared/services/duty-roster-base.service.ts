import { Injectable } from '@angular/core';
import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DutyRosterBaseService {

  constructor(
    private apiBase: ApiBaseService,
    private jsonServerBase: JsonServerService) { }


  // **************************************************************************
  // DutyRoster App Functions
  // **************************************************************************

  // POST DutyRoster/ShiftGroups/New
  postShiftGroupsNew(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftGroups/New', DataBody);
  }

  // POST DutyRoster/ShiftGroups/All
  postShiftGroupsAll(DataBody) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/ShiftGroups/All');
    } else {
      // MWSC - Api Server
      // return this.apiBase.postRequest('DutyRoster/ShiftGroups/All', DataBody);
      return this.apiBase.post('DutyRoster/ShiftGroups/All', DataBody);
    }
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}
  getShiftGroupById(Id) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/ShiftGroups/ShiftGroupId');
    } else {
      // MWSC - Api Server
      return this.apiBase.get('DutyRoster/ShiftGroups/' + Id);
    }
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Delete
  deleteShiftGroupById(Id) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id + '/Delete');
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Restore
  restoreShiftGroupById(Id) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id + '/Restore');
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Employees
  getShiftGroupEmployeesByShiftGroupId(Id) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id + '/Employees');
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Supervisors
  getShiftGroupSupervisorsByShiftGroupId(Id) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id + '/Supervisors');
  }

  // POST DutyRoster/ShiftGroups/AssignedToSupervisor
  postShiftGroupsAssignedToSupervisor(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftGroups/AssignedToSupervisor', DataBody);
  }

  // GET DutyRoster/ShiftGroups/AssignedToMe
  getShiftGroupsAssignedToMe() {
    return this.apiBase.get('DutyRoster/ShiftGroups/AssignedToMe');
  }





  // POST DutyRoster/ShiftsSupervisor/New
  postShiftsSupervisorNew(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftsSupervisor/New', DataBody);
  }

  // GET DutyRoster/ShiftsSupervisor/{ShiftsSupervisorId}/Remove
  deleteShiftsSupervisorById(Id) {
    return this.apiBase.get('DutyRoster/ShiftsSupervisor/' + Id + '/Remove');
  }

  // GET DutyRoster/ShiftsSupervisor/{ShiftsSupervisorId}/Restore
  restoreShiftsSupervisorById(Id) {
    return this.apiBase.get('DutyRoster/ShiftsSupervisor/' + Id + '/Restore');
  }

  // GET DutyRoster/ShiftsSupervisor/{ShiftSupervisorId}
  getShiftsSupervisorByShiftSupervisorId(Id) {
    return this.apiBase.get('DutyRoster/ShiftsSupervisor/' + Id);
  }

  // POST DutyRoster/ShiftEmployees/New
  postShiftEmployeeNew(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftEmployees/New', DataBody);
  }

  // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}
  getShiftEmployeesByShiftEmployeeId(Id) {
    return this.apiBase.get('DutyRoster/ShiftEmployees/' + Id);
  }

  // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}/Remove
  deleteShiftEmployeesById(Id) {
    return this.apiBase.get('DutyRoster/ShiftEmployees/' + Id + '/Remove');
  }

  // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}/Restore
  restoreShiftEmployeesById(Id) {
    return this.apiBase.get('DutyRoster/ShiftEmployees/' + Id + '/Restore');
  }

  // POST DutyRoster/WeeklyShift/GenerateForYear
  postGenerateYearForWeeklyShift(DataBody) {
    return this.apiBase.post('DutyRoster/WeeklyShift/GenerateForYear', DataBody);
  }

  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}
  getWeeklyShiftByWeeklyShiftId(Id) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + Id);
  }


  // GET DutyRoster/WeeklyShift/ShiftTemplate/Update
  getWeeklyShiftUpdateShiftTemplate(DataBody) {
    return this.apiBase.post('DutyRoster/WeeklyShift/ShiftTemplate/Update', DataBody);
  }

  // POST DutyRoster/WeeklyShift/All
  postWeeklyShiftAll(DataBody) {
    return this.apiBase.post('DutyRoster/WeeklyShift/All', DataBody);
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/Years
  getWeeklyShiftYearsByShiftGroupId(ShiftGroupId) {

    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/ShiftGroups/ShiftGroupId/WeeklyShift/Years');
    } else {
      // MWSC - Api Server
      return this.apiBase.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/Years');
    }
  }

  // GET DutyRoster/ShiftGroups/ShiftGroupId/WeeklyShift/ForYear/Year
  getWeeklyShiftsForYearsByShiftGroupId(ShiftGroupId, Year) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/ShiftGroups/ShiftGroupId/WeeklyShift/ForYear/Year');
    } else {
      // MWSC - Api Server
      return this.apiBase.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/ForYear/' + Year);
    }
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/{WeekNumber}/{Year}
  getShiftGroupsByShiftGroupId(ShiftGroupId, WeekNumber, Year) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/' + WeekNumber + '/' + Year);
  }




  getRollCallDetails(ShiftGroupId, WeekNumber, Year) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/' + WeekNumber + '/' + Year + '/RollCallDetails');
  }

  // GET DutyRoster/WeeklyShift/PendingHRRelease
  getWeeklyShiftPendingHRRelease() {
    return this.apiBase.get('DutyRoster/WeeklyShift/PendingHRRelease');
  }

  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/SupervisorRelease
  getWeeklyShiftSupervisorReleaseByWeeklyShiftId(WeeklyShiftId) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/SupervisorRelease');
  }

  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/HrRelease
  getWeeklyShiftHrReleaseByWeeklyShiftId(WeeklyShiftId) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/HrRelease');
  }






  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/release
  getWeeklyShiftChangeStatusReleaseByWeeklyShiftId(WeeklyShiftId) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/ChangeStatus/release');
  }

  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/CancelledShifts
  getWeeklyShiftCancelledShiftsByWeeklyShiftId(WeeklyShiftId) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/CancelledShifts');
  }

  // GET DutyRoster/WeeklyShifts/ByWeekAndYear/{WeekNumber}/{Year}
  getWeeklyShiftsByWeekAndYear(weekNum, year) {
    return this.apiBase.get('DutyRoster/WeeklyShifts/ByWeekAndYear/' + weekNum + '/' + year);
  }


  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/Open
  getWeeklyShiftChangeStatusToOpen(Id) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + Id + '/ChangeStatus/Open');
  }

  // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/Close
  getWeeklyShiftChangeStatusToClose(Id) {
    return this.apiBase.get('DutyRoster/WeeklyShift/' + Id + '/ChangeStatus/Close');
  }

  // POST DutyRoster/WeeklyShift/EditingIsPossible/Change
  postWeeklyShiftExtend(DataBody) {
    return this.apiBase.post('DutyRoster/WeeklyShift/EditingIsPossible/Change', DataBody);
  }

  // POST DutyRoster/Shifts/New
  postShiftNew(DataBody) {
    return this.apiBase.post('DutyRoster/Shifts/New', DataBody);
  }

  // GET DutyRoster/Shifts/{Id}/Remove
  getShiftRemove(Id) {
    return this.apiBase.get('DutyRoster/Shifts/' + Id + '/Remove');
  }

  // POST DutyRoster/Shifts/NewOff
  postShiftNewOff(DataBody) {
    return this.apiBase.post('DutyRoster/Shifts/NewOff', DataBody);
  }

  // GET api/DutyRoster?FromDate={FromDate}
  getDutyRosterFromDate(fromDate) {
    return this.apiBase.get('DutyRoster/FromDate/' + fromDate);
  }

  // POST DutyRoster/OffShifts/PendingSAPUpload (Offshift - SAP Upload)
  postShiftsSAPUploadPending(DataBody) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/OffShifts/PendingSAPUpload');
    } else {
      // MWSC-Api Server
      return this.apiBase.post('DutyRoster/OffShifts/PendingSAPUpload', DataBody);
    }
  }


  // POST DutyRoster/Shifts/MarkAsUploadToSAP (Shift SAP Upload)
  // {
  //     "Shift_Ids": [
  //       1,
  //       2
  //     ]
  //   }
  postShiftsMarkAsUploadToSAP(DataBody) {
    return this.apiBase.post('DutyRoster/Shifts/MarkAsUploadToSAP', DataBody);
  }

  // POST DutyRoster/Shifts/EmployeeWithShiftCount (Shift - SAP Upload)
  postShiftsEmployeeWithShiftCount(DataBody) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/Shifts/EmployeeWithShiftCount');
    } else {
      // MWSC-Api Server
      return this.apiBase.post('DutyRoster/Shifts/EmployeeWithShiftCount', DataBody);
    }
  }


  // GET DutyRoster/ShiftTemplates/All
  getShiftTemplatesAll() {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/ShiftTemplates/All');
    } else {
      // MWSC-Api Server
      return this.apiBase.get('DutyRoster/ShiftTemplates/All');
    }
  }

  // GET DutyRoster/ShiftTemplates/{ShiftTemplate_Id}
  getShiftTemplatesByShiftTemplateId(ShiftTemplateId) {
    return this.apiBase.get('DutyRoster/ShiftTemplates/' + ShiftTemplateId);
  }

  // POST DutyRoster/ShiftTemplates/New
  postShiftTemplatesNew(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftTemplates/New', DataBody);
  }

  // POST DutyRoster/ShiftTemplates/Times/New
  postShiftTemplatesTimesNew(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftTemplates/Times/New', DataBody);
  }

  // POST DutyRoster/ShiftTemplates/Times/Remove
  postShiftTemplatesTimesRemove(DataBody) {
    return this.apiBase.post('DutyRoster/ShiftTemplates/Times/Remove', DataBody);
  }





  // **************************************************************************
  // BaseApi Functions
  // **************************************************************************
  // GET Common/GetWeekNo?FromDate={FromDate}
  getWeekNo(fromDate) {
    return this.apiBase.get('Common/GetWeekNo?FromDate=' + fromDate);
  }

  // GET Common/GetFirstWeekDay?year={year}&weekNum={weekNum}
  getFirstWeekDay(year, weekNum) {
    return this.apiBase.get('Common/GetFirstWeekDay?year=' + year + '&weekNum=' + weekNum);
  }

  // GET Common/GetEndWeekDay?year={year}&weekNum={weekNum}
  getEndWeekDay(year, weekNum) {
    return this.apiBase.get('Common/GetEndWeekDay?year=' + year + '&weekNum=' + weekNum);
  }

  // GET Common/GetCurrentWeekNo
  getCurrentWeekNo() {
    return this.apiBase.get('Common/GetCurrentWeekNo');
  }

  // GET Common/GetCurrentWeekDetails
  getCurrentWeekDetails() {
    return this.apiBase.get('Common/GetCurrentWeekDetails');
  }

  // GET Common/GetWeekDetails?year={year}&weekNum={weekNum}
  getWeekDetails(year, weekNum) {
    return this.apiBase.get('Common/GetWeekDetails?year=' + year + '&weekNum=' + weekNum);
  }




  // **************************************************************************
  // Global Functions
  // **************************************************************************

  // GET My/Details
  getMyDetails() {
    return this.apiBase.get('My/Details');
  }

  // GET My/Details
  getMySubordinates() {
    return this.apiBase.get('My/Subordinates');
  }

  getUser(Id) {
    return this.apiBase.get('/Employee/' + Id + '/Details');
  }

  getUserPictureBase64(Id) {
    return this.apiBase.get('/Employee/' + Id + '/Picture/Base64');
  }

}
