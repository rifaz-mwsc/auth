import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveRequestsBaseService } from './../../../services/leave-requests-base.service'
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';


@Component({
  selector: 'app-hr-leave-requests-detail-view-model',
  templateUrl: './hr-leave-requests-detail-view-model.component.html',
  styleUrls: ['./hr-leave-requests-detail-view-model.component.scss']
})
export class HrLeaveRequestsDetailViewModelComponent implements OnInit {

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

  openMedicalCertificate(medicalCertificateLink){
    window.open(medicalCertificateLink, "_blank");
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('');
  }

  closeModel() {
    this.resetApiErrorModal('');
    this.requestDetails = [];
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
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
