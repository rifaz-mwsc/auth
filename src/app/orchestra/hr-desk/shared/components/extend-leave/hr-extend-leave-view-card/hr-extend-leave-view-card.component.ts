import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-extend-leave-view-card',
  templateUrl: './hr-extend-leave-view-card.component.html'
})
export class HrExtendLeaveViewCardComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;

  @ViewChild('CardViewRecordDetailsModal', { static: false }) CardViewRecordDetailsModal: ElementRef;
  @ViewChild('CardExtendRecordDetailsModal', { static: false }) CardExtendRecordDetailsModal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  hideViewRecordDetailsModal() {
    $('#CardViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#CardViewRecordDetailsModal').modal('show');
  }

  hideExtendRecordDetailsModal() {
    $('#CardExtendRecordDetailsModal').modal('hide');
  }

  showExtendRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#CardExtendRecordDetailsModal').modal('show');
  }

}
