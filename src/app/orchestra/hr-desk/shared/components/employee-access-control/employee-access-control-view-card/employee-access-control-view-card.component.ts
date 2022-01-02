import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-employee-access-control-view-card',
  templateUrl: './employee-access-control-view-card.component.html',
})
export class EmployeeAccessControlViewCardComponent implements OnInit {

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

  @ViewChild('CardViewUpdateRequestModal', { static: false }) CardViewUpdateRequestModal: ElementRef;
  @ViewChild('CardViewRemoveRequestModal', { static: false }) CardViewRemoveRequestModal: ElementRef;
  @ViewChild('CardViewRequestModal', { static: false }) CardViewRequestModal: ElementRef;

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
    $('#CardViewUpdateRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }




  hideViewUpdateAccessModal() {
    $('#CardViewUpdateAccessModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateAccessModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateAccessModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewUpdateCardInfoModal() {
    $('#CardViewUpdateCardModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewUpdateCardInfoModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateCardModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }






  hideViewRemoveRequestModal() {
    $('#CardViewRemoveRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRemoveRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewRemoveRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }


  hideViewRequestModal() {
    $('#CardViewRequestModal').modal('hide');
    // this.getRequestForPageOneOnlyWithFilter(1);
  }

  showViewRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewRequestModal').modal('show');
    setTimeout(() => {
      $('#createModel-info-alert').alert('close');
    }, 4000);
  }

}
