import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-ot-prior-approval-status-description',
  templateUrl: './clib-ot-prior-approval-status-description.component.html',
  styleUrls: ['./clib-ot-prior-approval-status-description.component.scss']
})
export class ClibOtPriorApprovalStatusDescriptionComponent implements OnInit {

  @Input() requestObj: any;

  constructor() { }

  ngOnInit() {
  }

  getStatusDescriptionColorCode(requestObj) {
    if (requestObj.leave_request_status_description === 'Request is approved' ||
      requestObj.leave_request_status_description === 'Request is approved' ||
      requestObj.leave_request_status_description.includes('Request is approved')) {
      return 'badge badge-success';
    }
    if (requestObj.leave_request_status_description === 'Pending HR approval' ||
      requestObj.leave_request_status_description === 'Request is sent for HR approval' ||
      requestObj.leave_request_status_description === 'pending HR approval') {
      return 'badge badge-info';
    }
    if (requestObj.leave_request_status_description === 'Request is sent for approval' ||
      requestObj.leave_request_status_description === 'request is sent for approval') {
      return 'badge badge-warning';
    }
    if (requestObj.leave_request_status_description === 'Request is sent for supervisor approval' ||
      requestObj.leave_request_status_description === 'request is sent for supervisor approval' ||
      requestObj.leave_request_status_description.includes('Request is sent for approval to') ||
      requestObj.leave_request_status_description.includes('Request is sent for supervisor approval') ||
      requestObj.leave_request_status_description.includes('Request is sent for supervisor')) {
      return 'badge badge-warning';
    }
    if (requestObj.leave_request_status_description === 'Request has expired' ||
      requestObj.leave_request_status_description === 'request has expired') {
      return 'badge badge-danger';
    }
    if (requestObj.leave_request_status_description === 'Not sent for approval' ||
      requestObj.leave_request_status_description === 'not sent for approval') {
      return 'badge badge-warning';
    }
  }
}
