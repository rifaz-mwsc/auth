import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service';
import { HrLeaveRequestsExtendBulkModelComponent } from '../hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-leave-requests-view-card',
  templateUrl: './hr-leave-requests-view-card.component.html',
  styleUrls: ['./hr-leave-requests-view-card.component.scss']
})
export class HrLeaveRequestsViewCardComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // UI-Parent Component Data
  @Input() viewType: any;
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;


   // Reset Fields - Call Child Function
  @ViewChild('CardViewRecordDetailsModal', { static: false }) CardViewRecordDetailsModal: ElementRef;
  // Refresh data From API - Call Parent Function
  @Output() requestToRefreshApiData: EventEmitter<any> = new EventEmitter();
  // Reset Fields - Call Child Function
  @ViewChild(HrLeaveRequestsExtendBulkModelComponent, { static: false }) HrLeaveRequestsExtendBulkModelComponent: HrLeaveRequestsExtendBulkModelComponent;



  constructor(private hrLeaveRequestsBase: LeaveRequestsBaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.HrLeaveRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }


  getHRDeskLeaveRequestDetails(leaveId) {
    this.showLoader = true;
    this.requestDetails = [];
    this.hrLeaveRequestsBase.getHRDeskLeaveRequestDetailsByLeaveId(leaveId).subscribe((data: any) => {
      console.log('getHRDeskLeaveRequestDetails data', data);
      this.requestDetails = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  hideViewRecordDetailsModal() {
    $('#CardViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.getHRDeskLeaveRequestDetails(selecteditem.leave_request_id);
    $('#CardViewRecordDetailsModal').modal('show');
  }

}
