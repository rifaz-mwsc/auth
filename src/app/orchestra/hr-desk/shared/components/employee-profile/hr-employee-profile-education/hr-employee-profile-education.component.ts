import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-education',
  templateUrl: './hr-employee-profile-education.component.html',
})
export class HrEmployeeProfileEducationComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileEducation: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) {
    this.profileEducation =
    {
      college: [
        {
          school: "Villa College",
          from_date: "2017-12-31T22:42:00", to_date: "2020-12-31T22:42:00", description: "", document: "Documents",
          graduated: true, privacy: "Public"
        },
        {
          school: "Villa College",
          from_date: "2017-12-31T22:42:00", to_date: "2020-12-31T22:42:00", description: "", document: "Documents",
          graduated: true, privacy: "Public"
        },
      ],
      highSchool: [
        {
          school: "Dharumavantha School",
          from_date: "2017-12-31T22:42:00", to_date: "2020-12-31T22:42:00", description: "", document: "Documents",
          graduated: true, privacy: "Public"
        },
        {
          school: "Dharumavantha School",
          from_date: "2017-12-31T22:42:00", to_date: "2020-12-31T22:42:00", description: "", document: "Documents",
          graduated: true, privacy: "Public"
        },
      ]
    };
   }

  ngOnInit() {
  }

  showViewRecordDetailsModal(requestObj){
    
  }

}
