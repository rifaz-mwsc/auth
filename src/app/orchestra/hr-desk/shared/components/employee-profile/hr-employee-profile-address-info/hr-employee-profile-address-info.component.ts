import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-address-info',
  templateUrl: './hr-employee-profile-address-info.component.html',
})
export class HrEmployeeProfileAddressInfoComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;
  profileAddress: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(private toastr: ToastrService) { 
    this.profileAddress =
    {
      currentAddress: [
        {
          name: "House 1",
          street: "Street 1",
          apartment_and_floor_no: "Floor 1, Aprt 104",
          city: "Hulhumale'", description: "",
          current_active_address: true,
          privacy: "Public"
        },
        {
          name: "House 2",
          street: "Street 1",
          apartment_and_floor_no: "Floor 1, Aprt 104",
          city: "Hulhumale'", description: "",
          current_active_address: false,
          privacy: "Public"
        },
        {
          name: "House 3",
          street: "Street 1",
          apartment_and_floor_no: "Floor 1, Aprt 104",
          city: "Hulhumale'", description: "",
          current_active_address: false,
          privacy: "Public"
        },
        {
          name: "House 4",
          street: "Street 1",
          apartment_and_floor_no: "Floor 1, Aprt 104",
          city: "Hulhumale'", description: "",
          current_active_address: false,
          privacy: "Public"
        },
      ],
      permanentAddress: [
        {
          name: "House 1",
          street: "Street 1",
          apartment_and_floor_no: "Floor 1, Aprt 104",
          city: "Hulhumale'", description: "",
          current_active_address: true,
          privacy: "Public"
        }
      ]
    };
  }

  ngOnInit() {
  }

  showViewRecordDetailsModal(requestObj){
    
  }

}
