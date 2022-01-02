import { Injectable } from '@angular/core';
import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecruitmentBaseService {

  constructor(
    private apiBase: ApiBaseService,
    private jsonServerBase: JsonServerService) { }

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
    return this.apiBase.get('DutyRoster/ShiftGroups/' + Id);
  }

}
