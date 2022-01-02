import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-experience',
  templateUrl: './hr-employee-profile-experience.component.html',
})
export class HrEmployeeProfileExperienceComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileExperience: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) { 
    this.profileExperience =
    {
      experience: [
        {
          company: "Male' Water & Sewerage Company Pvt. Ltd.",
          position: "Application Systems Analyst", city: "Male'", description: "", document: "Documents",
          currently_work_here: true,
          privacy: "Public"
        },
        {
          company: "Male' Water & Sewerage Company Pvt. Ltd.",
          position: "Application Systems Analyst", city: "Male'", description: "", document: "Documents",
          currently_work_here: true,
          privacy: "Public"
        },
      ],
      training: [
        {
          company: "Male' Water & Sewerage Company Pvt. Ltd.",
          position: "Application Systems Analyst", city: "Male'", description: "", document: "Documents",
          currently_work_here: true,
          privacy: "Public"
        },
        {
          company: "Male' Water & Sewerage Company Pvt. Ltd.",
          position: "Application Systems Analyst", city: "Male'", description: "", document: "Documents",
          currently_work_here: true,
          privacy: "Public"
        },
      ]
    };
  }

  ngOnInit() {
  }

  showViewRecordDetailsModal(requestObj){

  }

}
