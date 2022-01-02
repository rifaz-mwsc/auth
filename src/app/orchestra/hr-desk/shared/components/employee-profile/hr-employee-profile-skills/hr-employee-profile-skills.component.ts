import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-skills',
  templateUrl: './hr-employee-profile-skills.component.html',
})
export class HrEmployeeProfileSkillsComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileSkill: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) {
    this.profileSkill =
    {
      skill: [
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
      ],
      interest: [
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
        {
          name: "Coding", category: "ICT Software Development",  description: "",
          active: true, privacy: "Public"
        },
      ]
    };
  }

  ngOnInit() {
  }

  showViewRecordDetailsModal(requestObj){

  }
  
}
