import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-extend-ot-view-table',
  templateUrl: './hr-extend-ot-view-table.component.html',
  styleUrls: ['./hr-extend-ot-view-table.component.scss']
})
export class HrExtendOtViewTableComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;

  @ViewChild('TableViewRecordDetailsModal', { static: false }) TableViewRecordDetailsModal: ElementRef;
  @ViewChild('CardExtendRecordDetailsModal', { static: false }) CardExtendRecordDetailsModal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  hideViewRecordDetailsModal() {
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#TableViewRecordDetailsModal').modal('show');
  }

  hideExtendRecordDetailsModal() {
    $('#CardExtendRecordDetailsModal').modal('hide');
  }

  showExtendRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#CardExtendRecordDetailsModal').modal('show');
  }

}
