import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments//environment';
import { EmployeeBaseService } from './../../../services/employee-base.service';
import { HrEmployeeProfileBaseService } from './../../../services/hr-employee-profile-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-employee-profile-detail',
  templateUrl: './hr-employee-profile-detail.component.html',
})
export class HrEmployeeProfileDetailComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  toastrBulkTimeOut: any = environment.appConfig.hrDesk.common.toastrBulkTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;
  modelCloseTimeOut_1: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_1;
  modelCloseTimeOut_2: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_2;
  modelCloseTimeOut_3: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_3;
  modelCloseTimeOut_4: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_4;
  modelCloseTimeOut_5: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_5;
  modelCloseTimeOut_6: any = environment.appConfig.hrDesk.common.modelCloseTimeOut_6;

  selectedRequest: any;
  selectedEmployeeId: any;
  // Create New
  newSupervisor: any;
  newAccessCardNo: any;
  newAccessCardPin: any;
  showAccessCardNo: boolean = false;
  showAccessCardPin: boolean = false;
  newUpdateData: any;
  // Create New Upload
  newPicture: any;
  fileList: File[] = [];
  // Create New - Loader
  disableSaveButton: boolean = false;
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor(
    private toastr: ToastrService,
    private employeeBase: EmployeeBaseService,
    private hrEmployeeProfileBase: HrEmployeeProfileBaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.selectedEmployeeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.requestList = []
    this.employeeBase.getEmployeeSearchById(this.selectedEmployeeId).subscribe((data: any) => {
      console.log('requestList data', data);
      this.requestList = data;
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }

  ngOnInit() {
  }


  hideViewUpdateRequestModal() {
    $('#CardViewUpdateRequestModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateRequestModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateRequestModal').modal('show');
  }



  hideViewUpdateProfilePictureModal() {
    $('#CardViewUpdateProfilePictureModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateProfilePictureModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateProfilePictureModal').modal('show');
  }


  hideViewQrModal() {
    $('#CardViewQrModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewQrModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewQrModal').modal('show');
  }

  getQrCode(selectedProfile) {
    console.log('getQrCode selectedProfile', selectedProfile);
    // Converts the route into a string that can be used 
    // with the window.open() function
    // const url = this.router.serializeUrl(this.router.createUrlTree([`${selectedProfile.employee_public_profile_path}`]));
    // window.open(url, '_blank');

    window.open(selectedProfile.employee_public_profile_path, '_blank');
  }

  downloadQR(selectedProfile) {
    console.log('viewQR selectedProfile', selectedProfile);
    // window.location.href = selectedProfile.employee_qr_code_path;

    // window.open(selectedProfile.employee_qr_code_path, '_blank');


    // document.getElementsByTagName('img')[0].src;

       // const fileNameToDownload = 'image_qrcode';
    // const base64Img = document.getElementsByClassName('coolQRCode')[0]['qr-code'];
    // fetch(base64Img)
    //    .then(res => res.blob())
    //    .then((blob) => {
    //       // IE
    //       if (window.navigator && window.navigator.msSaveOrOpenBlob){
    //          window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
    //       } else { // Chrome
    //          const url = window.URL.createObjectURL(blob);
    //          const link = document.createElement('a');
    //          link.href = url;
    //          link.download = fileNameToDownload;
    //          link.click();
    //       }
    //    })


    let canvas = <HTMLCanvasElement>document.getElementById("image_qrcode")[0];
    if (canvas) {
      // let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      var link = document.createElement('a');
      link.download = "my-image.png";
      link.href = image;
      link.click();
    }
  }


  hideViewUpdateMobileNoModal() {
    $('#CardViewUpdateMobileNoModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateMobileNoModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateMobileNoModal').modal('show');
  }


  hideViewUpdateSupervisorModal() {
    $('#CardViewUpdateSupervisorModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateSupervisorModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateSupervisorModal').modal('show');
  }


  hideViewUpdateAccessModal() {
    $('#CardViewUpdateAccessModal').modal('hide');
    this.resetApiErrorModal('onChangeEvent');
  }

  showViewUpdateAccessModal(requestData) {
    this.selectedRequest = requestData;
    $('#CardViewUpdateAccessModal').modal('show');
  }

  // Name,
  // Mobile,
  // Extn,
  // Designation,
  // Location,
  // Region,
  // WorkAnniversary
  updateMobile(profileBaiscInfo) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileBasicInfo(
      {
        employee_id: profileBaiscInfo.employee_id,
        field_name: 'Mobile',
        field_value: this.newUpdateData
      }
    ).subscribe((data: any) => {
      console.log('updateMobile data', data);
      // this.requestList = data.items;
      // this.requestListWithPagination = data;
      this.showModelLoader = false;
      this.requestList.employee_mobile_number = this.newUpdateData;
      this.newUpdateData = [];
      this.toastr.success('Mobile No Updated', 'Mobile No Updated to ' + this.newUpdateData, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateMobile -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }


  updateSupervisor(selectedRequest) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileUpdateSupervisor(
      {
        employee_id: selectedRequest.employee_id,
        supervisor_employee_id: this.newSupervisor
      }
    ).subscribe((data: any) => {
      console.log('updateSupervisor data', data);
      this.showModelLoader = false;
      this.requestList.employee_manager.employee_designation = data.employee_manager.employee_designation;
      this.requestList.employee_manager.employee_domain_id = data.employee_manager.employee_domain_id;
      this.requestList.employee_manager.employee_email = data.employee_manager.employee_email;
      this.requestList.employee_manager.employee_ext_number = data.employee_manager.employee_ext_number;
      this.requestList.employee_manager.employee_id = data.employee_manager.employee_id;
      this.requestList.employee_manager.employee_mobile_number = data.employee_manager.employee_mobile_number;
      this.requestList.employee_manager.employee_name = data.employee_manager.employee_name;
      this.requestList.employee_manager.employee_name_with_id = data.employee_manager.employee_name_with_id;
      this.requestList.employee_manager.employee_picture_path = data.employee_manager.employee_picture_path;
      this.newSupervisor = [];

      this.toastr.success('Supervisor Updated', 'Supervisor Updated to ' + data.employee_manager.employee_name_with_id, { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateSupervisor -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }




  updateAccessCard(selectedRequest) {
    this.resetApiErrorModal('onChangeEvent');
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.postHRDeskProfileUpdateAccessCard(
      {
        employee_id: selectedRequest.employee_id,
        door_access_card_no: this.newAccessCardNo,
        door_access_card_pin: this.newAccessCardPin,
      }
    ).subscribe((data: any) => {
      console.log('updateAccessCard data', data);
      this.showModelLoader = false;
      this.newAccessCardNo = null;
      this.newAccessCardPin = null;
      this.toastr.success('Access Card Updated', 'Access Card Updated to' + '*****', { closeButton: true, timeOut: this.modelCloseTimeOut, progressBar: true, enableHtml: true });
    }, (error: Response | any) => {
      console.log('updateAccessCard -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }



  updateProfilePicture(event, employeeInfo) {
    let employeeId = '';
    console.log('employeeId', employeeId)
    this.fileList.push(...event.addedFiles);
    const formData = new FormData();

    for (var i = 0; i < this.fileList.length; i++) {
      formData.append('uploaded_file', this.fileList[i]);
      formData.append('employee_id', employeeInfo.employee_id);
      this.hrEmployeeProfileBase.postHRDeskProfileUpdatePicture(formData).subscribe((res: any) => {
        console.log(res);
        this.fileList = [];
        this.toastr.success('Employee: ' + employeeInfo.leave_request_employee_details, 'Documents Uploaded Successfully', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
        this.updateProfilePictureFromModel(employeeInfo);
        // setTimeout(() => {
        //   this.hideViewCreateUploadLetterModal();
        // }, this.modelCloseTimeOut_4);
      }, (error: Response | any) => {
        console.log('getMyLeaveRequestForPageOneOnly -> error', error);
        if (error.status === 400) {
          this.generalApiError = error.error.error_message;
          this.modelStateError = error.error.errors;
          console.log('error 400', error);
        } else if (error.status === 0 || error.status === 400 || error.status === 400) {
          this.generalApiError = 'oh snap! unknown error occurred';
        } else {
          this.generalApiError = error.error.error_message;
        }
        this.showLoader = false;
        this.fileList = [];
        // setTimeout(() => {
        //   this.hideViewCreateUploadLetterModal();
        // }, this.modelCloseTimeOut_4);
        return throwError(new Error(error.status));
      });
    }
  }

  removeProfilePicture(event) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }


  updateProfilePictureFromModel(employeeInfo) {
    this.showModelLoader = true;
    this.hrEmployeeProfileBase.getHRDeskProfilePicture(employeeInfo.employee_domain_id).subscribe((data: any) => {
      console.log('updateProfilePictureFromModel data', data);
      // this.requestList.employee_picture_path = data.employee_picture_path
    }, (error: Response | any) => {
      console.log('updateProfilePictureFromModel -> error', error);
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 403) {
        this.generalApiError = 'Authorization Error! You are not authorized to view this content';
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }



  showCheckAccessCardNo(check) {
    console.log('showCheckAccessCardNo', check);

  }

  showCheckAccessCardPin(check) {
    console.log('showCheckAccessCardPin', check);
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
