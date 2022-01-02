import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-employee-access-control-view-table',
  templateUrl: './employee-access-control-view-table.component.html',
})
export class EmployeeAccessControlViewTableComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedRequest: any;

  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;
  // Create New
  newCardNumber: any;

  @Input() profileAccessControl: any;
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


  // Create Division
  postUpdateCardInfo() {
    // this.showModelLoader = true;
    // this.organisationBase.postHRDeskAddDivision(
    //   {
    //     organization_division_name: this.newDivisionName,
    //   }
    // ).subscribe(data => {
    //   console.log('postHRDeskAddDivision', data);
    //   this.toastr.success('New Division', 'New Division Created', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
    //   this.showModelLoader = false;
    // }, (error: Response | any) => {
    //   console.log('error', error);
    //   if (error.status === 400) {
    //     this.generalApiError = error.error.error_message;
    //     this.modelStateError = error.error.errors;
    //     console.log('error 400', error);
    //   } else if (error.status === 0 || error.status === 500 || error.status === 501) {
    //     this.generalApiError = 'Oh Snap! Unknown Error Occurred';
    //   } else {
    //     this.generalApiError = error.error.error_message;
    //   }
    //   this.showModelLoader = false;
    //   return throwError(new Error(error.status));
    // });
  }


  hideViewUpdateRequestModal() {
    $('#TableViewUpdateRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewUpdateRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }





  hideViewUpdateAccessModal() {
    $('#TableViewUpdateAccessModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateAccessModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewUpdateAccessModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewUpdateCardInfoModal() {
    $('#TableViewUpdateCardModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateCardInfoModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewUpdateCardModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }








  hideViewRemoveRequestModal() {
    $('#TableViewRemoveRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRemoveRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewRemoveRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRequestModal() {
    $('#TableViewRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#TableViewRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }

}
