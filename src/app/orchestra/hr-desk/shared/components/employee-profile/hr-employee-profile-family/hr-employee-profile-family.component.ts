import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-family',
  templateUrl: './hr-employee-profile-family.component.html',
})
export class HrEmployeeProfileFamilyComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileFamily: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) {
    this.profileFamily =
    {
      family: [
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Mother", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Father", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Test Name",
          relation: "Wife", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Child", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Child", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Child", active: true, privacy: "Public"
        },
        {
          nid_no: "A100200", name: "Ahmed Test Name",
          relation: "Child", active: true, privacy: "Public"
        },
      ],
    };
  }

  ngOnInit() {
  }

  showViewRecordDetailsModal(requestObj){

  }

}
