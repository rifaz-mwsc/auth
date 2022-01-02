import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from './../../../../../../../environments/environment';
import { OrganizationBaseService } from './../../../../shared/services/organization/organization-base.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-section-view-list',
  templateUrl: './section-view-list.component.html',
  styleUrls: ['./section-view-list.component.scss']
})
export class SectionViewListComponent implements OnInit {

  toastrTimeOut: any = environment.appConfig.hrDesk.common.toastrTimeOut;
  modelCloseTimeOut: any = environment.appConfig.hrDesk.common.modelCloseTimeOut;

  selectedData: any;
  // Remove Model -
  showModelLoader: boolean = false;
  // Error Handling
  modelStateError: any;
  generalApiError: any;

  selectedSection: any = [];

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
    $('#ListViewRemoveModal').modal('hide');
  }

  showRemoveModal(selecteditem) {
    this.modelStateError = null;
    this.generalApiError = null;
    this.selectedSection = selecteditem;
    $('#ListViewRemoveModal').modal('show');
  }

  // Remove
  postRemove(selecteditem) {
    this.showModelLoader = true;
    this.organizationBase.postHRDeskRemoveSection(selecteditem.organization_section_id).subscribe((data: any) => {
      this.toastr.warning('Remove Section', 'Section Removed', { closeButton: true, timeOut: this.toastrTimeOut, progressBar: true, enableHtml: true });
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
