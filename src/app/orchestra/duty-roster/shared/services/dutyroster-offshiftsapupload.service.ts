import { Injectable } from '@angular/core';
import { ApiBaseService } from './../../../../core/services/api-related/api-base.service';
import { JsonServerService } from './../../../../core/services/json-server/json-server.service';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DutyrosterOffshiftsapuploadService {

  constructor(
    private apiBase: ApiBaseService,
    private jsonServerBase: JsonServerService) { }

  // POST DutyRoster/OffShifts/PendingSAPUpload
  postShiftsSAPUploadPending(DataBody) {
    if (environment.devJsonApiConfig.api_json_server === true) {
      // Node Json Server
      return this.jsonServerBase.get('DutyRoster/OffShifts/PendingSAPUpload');
    } else {
      // MWSC-Api Server
      return this.apiBase.post('DutyRoster/OffShifts/PendingSAPUpload', DataBody);
    }
  }


}
