import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HrAuthorizationService } from './../../../services/manage-authorization/hr-authorization.service';
import { environment } from './../../../../../../../environments/environment'
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-auth-dashboard-set-as-default',
  templateUrl: './hr-auth-dashboard-set-as-default.component.html',
  styleUrls: ['./hr-auth-dashboard-set-as-default.component.scss']
})
export class HrAuthDashboardSetAsDefaultComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
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
  }

  remove(selecteditem) {
    console.log('Authorization remove data', selecteditem);
    this.resetApiErrorModal('Authorization remove');
    this.showModelLoader = true;
    this.hrAuthorizationService.putHRDeskSetAsDefaultAuthorization(selecteditem.dashboard_id).subscribe((data: any) => {
      console.log('Authorization remove data', data);
      setTimeout(() => {
        // Closing model with timeout
        this.closeModel();
      }, this.modelCloseTimeOut);
      this.toastr.success('Authorization', 'Authorization is set as Default', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });

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
