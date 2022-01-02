import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-extend-ot-view-card',
  templateUrl: './hr-extend-ot-view-card.component.html',
  styleUrls: ['./hr-extend-ot-view-card.component.scss']
})
export class HrExtendOtViewCardComponent implements OnInit {

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
