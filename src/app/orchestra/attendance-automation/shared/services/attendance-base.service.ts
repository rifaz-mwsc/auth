import { Injectable } from '@angular/core';
import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttendanceBaseService {

  constructor(
    private apiBase: ApiBaseService,
    private jsonServerBase: JsonServerService
    ) { }




  // POST Attendance/Generate/Report
  postGenerateAttendanceReport(DataBody) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('Attendance/Generate/Report');
    } else {
      // MWSC - Api Server
      return this.apiBase.post('Attendance/Generate/Report', DataBody);
    }
  }

  // GET DutyRoster/ShiftGroups/{ShiftGroupId}
  getShiftGroupById(Id) {
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id);
  }

}
