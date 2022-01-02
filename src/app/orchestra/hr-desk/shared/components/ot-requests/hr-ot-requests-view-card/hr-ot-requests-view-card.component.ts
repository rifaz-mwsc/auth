import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
import { HrOtRequestsExtendBulkModelComponent } from '../hr-ot-requests-extend-bulk-model/hr-ot-requests-extend-bulk-model.component';


@Component({
  selector: 'app-hr-ot-requests-view-card',
  templateUrl: './hr-ot-requests-view-card.component.html',
  styleUrls: ['./hr-ot-requests-view-card.component.scss']
})
export class HrOtRequestsViewCardComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];
  // Parent Component Data
  @Input() requestList: any;
  @Input() showLoader: boolean;


  // Reset Fields - Call Child Function
  @ViewChild('CardViewRecordDetailsModal', { static: false }) CardViewRecordDetailsModal: ElementRef;
  // Reset Fields - Call Child Function
  @ViewChild(HrOtRequestsExtendBulkModelComponent, { static: false }) HrOtRequestsExtendBulkModelComponent: HrOtRequestsExtendBulkModelComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.HrOtRequestsExtendBulkModelComponent.resetApiErrorModal('fromParent');
  }

  hideViewRecordDetailsModal() {
    $('#CardViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#CardViewRecordDetailsModal').modal('show');
  }

}
