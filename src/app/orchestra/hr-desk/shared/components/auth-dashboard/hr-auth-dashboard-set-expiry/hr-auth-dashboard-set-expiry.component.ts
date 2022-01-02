import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HrAuthorizationService } from './../../../services/manage-authorization/hr-authorization.service';
import { environment } from './../../../../../../../environments/environment'
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-auth-dashboard-set-expiry',
  templateUrl: './hr-auth-dashboard-set-expiry.component.html',
  styleUrls: ['./hr-auth-dashboard-set-expiry.component.scss']
})
export class HrAuthDashboardSetExpiryComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Form Field
  @Input() validFromDate: any;
  @Input() validToDate: any;
  // This Model - Loader
  @Input() showModelLoader: boolean;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selecteditem: any;
  @Input() requestDetails: any;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private hrAuthorizationService: HrAuthorizationService) {
    this.resetApiErrorModal('constructor');


  }

  ngOnInit() {
    this.resetApiErrorModal('ngOnInit');
    console.log('this.validFromDate', this.validFromDate);
  }

  setExpiry(selecteditem) {
    let FunctionLabel = 'Authorization Set Expiry :: '
    this.printConsoleLog(FunctionLabel, selecteditem);
    this.resetApiErrorModal('Authorization remove');
    this.showModelLoader = true;
    // this.hrAuthorizationService.putHRDeskSetValidityAuthorization(selecteditem.dashboard_id, this.validFromDate, this.validFromTo).subscribe((data: any) => {

    this.hrAuthorizationService.putHRDeskSetValidityAuthorization(
      {
        dashboard_id: selecteditem.dashboard_id,
        valid_from: moment(this.validFromDate).format('DD MMM YYYY'),
        valid_to: moment(this.validToDate).format('DD MMM YYYY')
      }).subscribe((data: any) => {
        this.printConsoleLog(FunctionLabel, data);
        setTimeout(() => {
          // Closing model with timeout
          this.closeModel();
        }, this.modelCloseTimeOut);
        this.toastr.success('Authorization', 'Authorization Validity Updated', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
        this.showModelLoader = false;
      }, (error: Response | any) => {
        console.log('remove -> error', error);
        if (error.status === 400) {
          this.generalApiError = error.error.error_message;
          this.modelStateError = error.error.errors;
          console.log('error 400', error);
        } else if (error.status === 0 || error.status === 500 || error.status === 501) {
          this.generalApiError = 'Oh Snap! Unknown Error Occurred';
        } else {
          this.generalApiError = error.error.error_message;
        }
        console.log('Authorization remove -> generalApiError', this.generalApiError);
        console.log('Authorization remove -> modelStateError', this.modelStateError);
        this.showModelLoader = false;
        return throwError(new Error(error.status));
      });
  }


  modelValidFromChanged(event) {
    console.log('modelValidFromChanged ', event)
    this.validFromDate = event;
  }


  modelValidToChanged(event) {
    console.log('modelValidFromChanged ', event)
    this.validToDate = event;
  }

  printConsoleLog(FunctionLabel, data) {
    console.log(FunctionLabel, data);
  }



  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    this.resetApiErrorModal('onChangeEvent');
  }

  closeModel() {
    this.resetApiErrorModal('closeModel');
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
