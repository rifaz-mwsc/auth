import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DutyrosterManageShiftgroupBaseService } from '../../../../shared/services/dutyroster-manage-shiftgroup-base.service';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-weeklyshift-manage-view-table',
  templateUrl: './weeklyshift-manage-view-table.component.html',
  styleUrls: ['./weeklyshift-manage-view-table.component.scss']
})
export class WeeklyshiftManageViewTableComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

  // showLoader: boolean;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // This Model - Loader
  @Input() showLoader: boolean = false;
  // Parent Component Data
  @Input() shiftGroupWeeklyShifts: any;
  @Input() selectedShiftGroupId: any;
  @Input() selectedYear: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private hrDutyrosterManageShiftgroupBase: DutyrosterManageShiftgroupBaseService) { }

  ngOnInit() {
  }

}
