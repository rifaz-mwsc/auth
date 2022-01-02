import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service'
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-hr-auth-dashboard-details-common-view',
  templateUrl: './hr-auth-dashboard-details-common-view.component.html',
  styleUrls: ['./hr-auth-dashboard-details-common-view.component.scss']
})
export class HrAuthDashboardDetailsCommonViewComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  rejectionReason: any;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selecteditem: any;
  @Input() requestDetails: any;
  @Input() showModelLoader: boolean;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private leaveRequestsBase: LeaveRequestsBaseService) { }


  ngOnInit() {
  }

}
