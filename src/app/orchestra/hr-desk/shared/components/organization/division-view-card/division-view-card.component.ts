import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { OrganizationBaseService } from './../../../../shared/services/organization/organization-base.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-division-view-card',
  templateUrl: './division-view-card.component.html',
  styleUrls: ['./division-view-card.component.scss']
})
export class DivisionViewCardComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedData: any;
  // Remove Model -
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  selectedDivision: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private organizationBase: OrganizationBaseService) { }

  ngOnInit() {
  }

  hideRemoveModal() {
    this.modelStateError = null;
    this.generalApiError = null;
    $('#CardViewRemoveModal').modal('hide');
  }

  showRemoveModal(selecteditem) {
    this.modelStateError = null;
    this.generalApiError = null;
    this.selectedDivision = selecteditem;
    $('#CardViewRemoveModal').modal('show');
  }

  gotoDepartmentPage(selecteditem) {
    this.router.navigate(['/hr', { outlets: { 'pages': ['hr-desk-department', selecteditem.organization_division_id] } }]);
    
    // [routerLink]="['/hr', {outlets: {pages: ['hr-desk-holidays', divisionObj.organization_division_id]}}]"
  }


  // Remove
  postRemoveDivision(selecteditem) {
    this.showModelLoader = true;
    this.organizationBase.postHRDeskRemoveDivision(selecteditem.organization_division_id).subscribe((data: any) => {
      this.toastr.warning('Remove Division', 'Division Removed', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
      this.showModelLoader = false;
    }, (error: Response | any) => {
      if (error.status === 400) {
        this.generalApiError = error.error.error_message;
        this.modelStateError = error.error.errors;
        console.log('error 400', error);
      } else if (error.status === 0 || error.status === 500 || error.status === 501) {
        this.generalApiError = 'Oh Snap! Unknown Error Occurred';
      } else {
        this.generalApiError = error.error.error_message;
      }
      this.showModelLoader = false;
      return throwError(new Error(error.status));
    });
  }


}
