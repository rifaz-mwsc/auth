import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-hr-allowance-salary-key-common-view',
  templateUrl: './hr-allowance-salary-key-common-view.component.html',
  styleUrls: ['./hr-allowance-salary-key-common-view.component.scss']
})
export class HrAllowanceSalaryKeyCommonViewComponent implements OnInit {

  // Model TimeOut
  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  // Create New - Loader
  disableSaveButton: boolean = false;
  showHandoverModel: boolean = false;
  showHandoverModelLoader: boolean = false;
  // This Model - Loader
  @Input() showModelLoader: boolean = false;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selectedData: any;

  constructor(
    private toastr: ToastrService) { }

  ngOnInit() {
  }


  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    console.log('onChangeEvent 400', event);
  }

  closeModel() {
  }

}
