import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-access-control',
  templateUrl: './hr-employee-profile-access-control.component.html',
})
export class HrEmployeeProfileAccessControlComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileAccessControl: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) { 
    this.profileAccessControl =
    {
      doorAccess: [
        {
          title: "Fen Building - FL-1 Front",
          building_name: "Fen Building", floor_no: "Floor 1", city: "Male'", description: "",
          access_control: true,
        },
        {
          title: "Fen Building - FL-1 Front",
          building_name: "Fen Building", floor_no: "Floor 1", city: "Male'", description: "",
          access_control: true,
        },
        {
          title: "Fen Building - FL-1 Front",
          building_name: "Fen Building", floor_no: "Floor 1", city: "Male'", description: "",
          access_control: true,
        },
        {
          title: "Fen Building - FL-1 Front",
          building_name: "Fen Building", floor_no: "Floor 1", city: "Male'", description: "",
          access_control: true,
        },
      ],
    };
  }

  ngOnInit() {
  }

}
